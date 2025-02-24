const z = require('zod');

const userSchemas = {
  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['tenant', 'landlord', 'admin']),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    idNumber: z.string().min(5, 'Invalid ID number')
  }),

  login: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
  })
};

const unitSchemas = {
  create: z.object({
    unitName: z.string().min(1, 'Unit name is required'),
    rentAmount: z.number().positive('Rent amount must be positive')
  }),

  update: z.object({
    unitName: z.string().optional(),
    rentAmount: z.number().positive().optional(),
    isOccupied: z.boolean().optional(),
    paymentStatus: z.enum(['paid', 'unpaid']).optional()
  })
};

const paymentSchemas = {
  create: z.object({
    unitId: z.string().min(1, 'Unit ID is required'),
    amountPaid: z.number().positive('Amount must be positive'),
    month: z.string().min(1, 'Month is required'),
    paymentMethod: z.enum(['mpesa', 'cash', 'bank']),
    transactionId: z.string().optional()
  })
};

const complaintSchemas = {
  create: z.object({
    unitId: z.string().min(1, 'Unit ID is required'),
    description: z.string().min(10, 'Description must be at least 10 characters')
  }),

  update: z.object({
    status: z.enum(['pending', 'in-progress', 'resolved'])
  })
};

const ratingSchemas = {
  create: z.object({
    unitId: z.string().min(1, 'Unit ID is required'),
    rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
    review: z.string().optional()
  })
};

module.exports = {
  userSchemas,
  unitSchemas,
  paymentSchemas,
  complaintSchemas,
  ratingSchemas
};