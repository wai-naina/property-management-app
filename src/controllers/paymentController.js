const Payment = require("../models/Payment");
const mpesaService = require("../services/mpesaService");
const { AppError } = require("../utils/errors");

// Get all payments
const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate('unitId', 'unitName rentAmount')
      .populate('tenantId', 'name email');
      
    res.status(200).json({
      status: 'success',
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

// Create new payment
const createPayment = async (req, res, next) => {
  try {
    const { unitId, amountPaid, month, paymentMethod } = req.body;

    let paymentDetails = {
      unitId,
      tenantId: req.user.id,
      amountPaid,
      month,
      paymentMethod
    };

    // Handle M-Pesa payment
    if (paymentMethod === 'mpesa') {
      const user = await User.findById(req.user.id);
      const mpesaResponse = await mpesaService.initiateSTKPush(
        user.phoneNumber,
        amountPaid,
        unitId
      );
      paymentDetails.transactionId = mpesaResponse.CheckoutRequestID;
    }

    const payment = await Payment.create(paymentDetails);
    
    res.status(201).json({
      status: 'success',
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

// M-Pesa callback
const mpesaCallback = async (req, res, next) => {
  try {
    const { Body: { stkCallback: { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } } } = req.body;
    
    if (ResultCode === 0) {
      // Payment successful
      await Payment.findOneAndUpdate(
        { transactionId: CheckoutRequestID },
        { status: 'completed' }
      );
    } else {
      // Payment failed
      await Payment.findOneAndUpdate(
        { transactionId: CheckoutRequestID },
        { status: 'failed', failureReason: ResultDesc }
      );
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getPaymentsByUnit = async (req, res, next) => {
    try {
        const { unitId } = req.params;
        const payments = await Payment.find({ unitId })
            .populate('tenantId', 'name email');
        
        res.status(200).json({
            status: 'success',
            data: payments
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getPayments, createPayment, mpesaCallback, getPaymentsByUnit };

