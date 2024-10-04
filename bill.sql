DROP TABLE IF EXISTS `bill`;
CREATE TABLE bill (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO `bill` (`id`, `name`, `amount`, `category`, `create_time`) VALUES (1, 'test', 10.00, 'shopping', '2024-10-01 21:47:37');
INSERT INTO `bill` (`id`, `name`, `amount`, `category`, `create_time`) VALUES (3, 'test2', 10000.00, 'test', '2024-10-01 21:47:37');
INSERT INTO `bill` (`id`, `name`, `amount`, `category`, `create_time`) VALUES (4, 'test3', 10.00, 'shopping', '2024-10-02 22:16:33');
INSERT INTO `bill` (`id`, `name`, `amount`, `category`, `create_time`) VALUES (5, 'test4', 10.00, 'shopping', '2024-10-03 10:11:59');
INSERT INTO `bill` (`id`, `name`, `amount`, `category`, `create_time`) VALUES (6, 'test5', 10.00, 'shopping', '2024-10-03 10:21:42');
