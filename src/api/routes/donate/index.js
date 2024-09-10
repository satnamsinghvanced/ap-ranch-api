import express from "express";
import pool from "../../../db/index.js";
import { Client } from "square";
import { randomUUID } from "crypto";
import config from "../../../../config.js";

const router = express.Router();
const { SQUARE_ACCESS_TOKEN, LOCATION_ID } = config;
const { paymentsApi, customersApi } = new Client({
  accessToken: SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

router.post("/", async (req, res) => {
  let connection;
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      state,
      amount,
      sourceId,
      postalCode,
    } = req.body;
    let customerId;
    let country = "US";

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existingCustomer] = await connection.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );

    if (existingCustomer.length !== 0) {
      customerId = existingCustomer[0].customerId;
    } else {
      const { result } = await customersApi.createCustomer({
        givenName: `${firstName} ${lastName}`,
        emailAddress: email,
        address: {
          first_name: firstName,
          last_name: lastName,
          administrative_district_level_1: state,
          postalCode: postalCode,
          country,
        },
        phoneNumber: phone,
      });
      customerId = result.customer.id;
      await connection.query(
        `INSERT INTO customer (customerId,firstName, lastName, phone,email,state,country,postalCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          customerId,
          firstName,
          lastName,
          phone,
          email,
          state,
          country,
          postalCode,
        ]
      );
    }

    const { result: paymentResult } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: Math.round(amount * 100),
      },
      locationId: LOCATION_ID,
      buyerEmailAddress: email,
      customerId,
      billingAddress: {
        administrative_district_level_1: state,
        firstName,
        lastName,
      },
    });
    const payment = paymentResult.payment;
    if (payment.status === "COMPLETED") {
      const status = payment.status;
      const paymentId = payment.id;
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
      await connection.rollback();
      return res.status(400).json({
        message: `Payment failed or incomplete: ${payment.status}`,
        paymentDetails: payment,
      });
    }
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;
