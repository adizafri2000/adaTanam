-- Insert into account table
INSERT INTO staging.account(email, password_hash, type, is_active)
VALUES
    ('admin1@example.com', 'hashedpassword', 'admin', true),
    ('admin2@example.com', 'hashedpassword', 'admin', true),
    ('farmer1@example.com', 'hashedpassword', 'farmer', true),
    ('farmer2@example.com', 'hashedpassword', 'farmer', true),
    ('consumer1@example.com', 'hashedpassword', 'consumer', true),
    ('consumer2@example.com', 'hashedpassword', 'consumer', true);

-- Insert into store table
INSERT INTO staging.store(name, location, bank_name, bank_number, farmer)
VALUES
    ('Farmer1 Store', '(40.712776,-74.005974)', 'Maybank', '1234567890', 3),
    ('Farmer2 Store', '(40.712231,-74.005974)', 'CIMB', '1234567890', 4);

-- Insert into produce table
INSERT INTO staging.produce(name, type, stock, unit_price, selling_unit, status, store)
VALUES
    ('Apple', 'Fruit', 100, 1.00, 'kg', 'available', 1),
    ('Banana', 'Fruit', 200, 0.50, 'g', 'out of stock', 2),
    ('Carrot', 'Vegetable', 150, 0.75, 'piece', 'pending harvest', 1),
    ('Potato', 'Vegetable', 300, 0.60, 'bag', 'available', 2),
    ('Oranges', 'Fruit', 50, 20.00, 'box', 'available', 1);

-- Insert into cart table
INSERT INTO staging.cart(is_active, account)
VALUES
    (false, 5),
    (false, 5),
    (true, 5),
    (false, 6),
    (false, 6),
    (true, 6);

-- Insert into cart_item table
INSERT INTO staging.cart_item(cart, produce, quantity)
VALUES
    (1, 1, 2),
    (1, 2, 4),
    (2, 2, 3),
    (2, 5, 3),
    (3, 3, 4),
    (3, 1, 4),
    (4, 4, 5),
    (4, 2, 5),
    (5, 4, 2),
    (5, 5, 2),
    (6, 1, 3),
    (6, 5, 3);

-- Insert into order table
INSERT INTO staging.order(account, store, cart, pickup, status, rating)
VALUES
    (5, 1, 1, CURRENT_TIMESTAMP + INTERVAL '1 day', 'processing', 5),
    (5, 1, 1, CURRENT_TIMESTAMP + INTERVAL '1 day', 'ready', 4),
    (6, 2, 2, CURRENT_TIMESTAMP + INTERVAL '1 day', 'completed', 3),
    (6, 2, 2, CURRENT_TIMESTAMP + INTERVAL '1 day', 'cancelled', 2);

-- Insert into payment table
INSERT INTO staging.payment("order", total_price, method)
VALUES
    (1, 2.00, 'cash'),
    (2, 3.00, 'cash'),
    (3, 4.00, 'online'),
    (4, 5.00, 'online');