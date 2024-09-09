import express from "express";
import pool from "../../../db/index.js";
import { Client } from "square";
import { randomUUID } from "crypto";
import config from "../../../../config.js";

const router = express.Router();
const { SQUARE_ACCESS_TOKEN } = config;
const { paymentsApi } = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, phone, email, state, amount, sourceId } =
      req.body;
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: amount,
      },
      buyerEmailAddress: email,
      billingAddress: {
        locality: state,
        firstName,
        lastName,
      },
    });
    const payment = result.payment;
    if (payment.status === "COMPLETED") {
      const status = payment.status;
      const paymentId = payment.id;
      const connection = await pool.getConnection();
      await connection.beginTransaction();
      await connection.query(
        `INSERT INTO payments (paymentId,firstName, lastName, phone,email,state,amount,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [paymentId, firstName, lastName, phone, email, state, amount, status]
      );
      await connection.commit();
      connection.release();
      return res.status(200).json({
        message: "Payment successful",
      });
    } else {
      return res.status(400).json({
        message: `Payment failed or incomplete: ${payment.status}`,
        paymentDetails: payment,
      });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
