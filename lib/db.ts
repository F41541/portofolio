import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;
let initPromise: Promise<void> | null = null;

export function getDbConfig() {
  const host = process.env.MYSQL_HOST || "127.0.0.1";
  const port = parseInt(process.env.MYSQL_PORT || "3306", 10);
  const user = process.env.MYSQL_USER || "root";
  const password = process.env.MYSQL_PASSWORD || "";
  const database = process.env.MYSQL_DATABASE || "laxstudio_store";

  return {
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };
}

export function getDbPool(): mysql.Pool {
  if (!pool) {
    const config = getDbConfig();
    pool = mysql.createPool(config);
  }
  return pool;
}

export async function initDatabase(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const db = getDbPool();
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          order_id VARCHAR(100) NOT NULL PRIMARY KEY,
          product_id VARCHAR(100) NOT NULL,
          product_title VARCHAR(255) NOT NULL,
          customer_name VARCHAR(100) NOT NULL,
          customer_email VARCHAR(100) NOT NULL,
          customer_phone VARCHAR(50) NOT NULL,
          amount INT UNSIGNED NOT NULL,
          payment_method VARCHAR(20) NOT NULL,
          reference VARCHAR(255) NULL,
          payment_url VARCHAR(500) NULL,
          va_number VARCHAR(100) NULL,
          qr_string TEXT NULL,
          status ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
          result_code VARCHAR(20) NULL,
          created_at DATETIME NOT NULL,
          updated_at DATETIME NOT NULL,
          INDEX idx_orders_status (status),
          INDEX idx_orders_email (customer_email),
          INDEX idx_orders_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);
    } catch (error) {
      console.error("[Database Init Error]:", error);
      // Reset promise so retry is possible on next query
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

export async function closeDbPool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    initPromise = null;
  }
}
