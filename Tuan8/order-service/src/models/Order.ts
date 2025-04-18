import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
	products: Object[];
	customerId: string;
	createdAt: Date;
	updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
	products: {
		type: [Object],
		required: true,
	},
	customerId: {
		type: String,
		required: true,
	},
},
	{
		timestamps: true,
	}
);

const OrderModel = model<IOrder>("Order", OrderSchema);

export default OrderModel;
export { IOrder };
