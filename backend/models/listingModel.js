
// Packages

// javascript
// Copy
// {
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the package
//   hotels: [
//     {
//       hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
//       roomType: { type: String, required: true },
//       checkInDate: { type: Date, required: true },
//       nightsStay: { type: Number, required: true },
//       totalAmount: { type: Number, required: true }
//     }
//   ],
//   services: [
//     {
//       serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
//       quantity: { type: Number, default: 1 }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// }


