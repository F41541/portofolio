import { getDbPool, initDatabase } from "./db.ts";

export type OrderStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";

export interface Order {
  orderId: string;
  productId: string;
  productTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  paymentUrl?: string;
  vaNumber?: string;
  qrString?: string;
  status: OrderStatus;
  resultCode?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderRow {
  order_id: string;
  product_id: string;
  product_title: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  payment_method: string;
  reference: string | null;
  payment_url: string | null;
  va_number: string | null;
  qr_string: string | null;
  status: OrderStatus;
  result_code: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

function mapRowToOrder(row: OrderRow): Order {
  return {
    orderId: row.order_id,
    productId: row.product_id,
    productTitle: row.product_title,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    amount: Number(row.amount),
    paymentMethod: row.payment_method,
    reference: row.reference ?? undefined,
    paymentUrl: row.payment_url ?? undefined,
    vaNumber: row.va_number ?? undefined,
    qrString: row.qr_string ?? undefined,
    status: row.status,
    resultCode: row.result_code ?? undefined,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
    updatedAt:
      row.updated_at instanceof Date
        ? row.updated_at.toISOString()
        : new Date(row.updated_at).toISOString(),
  };
}

export async function createOrder(
  data: Omit<Order, "createdAt" | "updatedAt">
): Promise<Order> {
  await initDatabase();
  const db = getDbPool();
  const cleanOrderId = data.orderId.trim();

  // Check if order already exists to prevent duplicate insertion
  const existing = await getOrderById(cleanOrderId);
  if (existing) {
    return existing;
  }

  const query = `
    INSERT INTO orders (
      order_id, product_id, product_title, customer_name,
      customer_email, customer_phone, amount, payment_method,
      reference, payment_url, va_number, qr_string,
      status, result_code, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  const values = [
    cleanOrderId,
    data.productId,
    data.productTitle,
    data.customerName,
    data.customerEmail,
    data.customerPhone,
    data.amount,
    data.paymentMethod,
    data.reference ?? null,
    data.paymentUrl ?? null,
    data.vaNumber ?? null,
    data.qrString ?? null,
    data.status,
    data.resultCode ?? null,
  ];

  await db.query(query, values);
  const created = await getOrderById(cleanOrderId);
  if (!created) {
    throw new Error(`Failed to retrieve created order: ${cleanOrderId}`);
  }
  return created;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!orderId) return null;
  await initDatabase();
  const db = getDbPool();

  const [rows] = (await db.query(
    "SELECT * FROM orders WHERE order_id = ? LIMIT 1",
    [orderId.trim()]
  )) as [OrderRow[], unknown];

  if (!rows || rows.length === 0) {
    return null;
  }

  return mapRowToOrder(rows[0]);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  extra?: Partial<Omit<Order, "orderId" | "createdAt">>
): Promise<Order | null> {
  if (!orderId) return null;
  await initDatabase();
  const db = getDbPool();
  const cleanOrderId = orderId.trim();

  const updates: string[] = ["status = ?", "updated_at = NOW()"];
  const params: unknown[] = [status];

  if (extra?.reference !== undefined) {
    updates.push("reference = ?");
    params.push(extra.reference);
  }
  if (extra?.paymentUrl !== undefined) {
    updates.push("payment_url = ?");
    params.push(extra.paymentUrl);
  }
  if (extra?.vaNumber !== undefined) {
    updates.push("va_number = ?");
    params.push(extra.vaNumber);
  }
  if (extra?.qrString !== undefined) {
    updates.push("qr_string = ?");
    params.push(extra.qrString);
  }
  if (extra?.resultCode !== undefined) {
    updates.push("result_code = ?");
    params.push(extra.resultCode);
  }

  params.push(cleanOrderId);

  const query = `UPDATE orders SET ${updates.join(", ")} WHERE order_id = ?`;
  await db.query(query, params);

  return getOrderById(cleanOrderId);
}

export async function getAllOrders(): Promise<Order[]> {
  await initDatabase();
  const db = getDbPool();

  const [rows] = (await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  )) as [OrderRow[], unknown];

  return rows.map(mapRowToOrder);
}
