-- Handcrafted Haven - Seed Data
-- Optional reference script. The /seed endpoint inserts the same data via TypeScript.

TRUNCATE reviews, products, categories, seller_profiles, users RESTART IDENTITY CASCADE;

INSERT INTO users (id, name, email, password, role) VALUES
  ('63d09b2d-1101-41f8-b337-7f5c6c994c95', 'Admin User', 'admin@handcraftedhaven.com', 'admin123', 'admin'),
  ('7e4a2189-3b62-4cdf-9124-a6f83d5c0721', 'Elena Martinez', 'elena@handcraftedhaven.com', 'seller123', 'seller'),
  ('8f5b329a-4c73-4de0-a235-b7094e6d1832', 'Marco Reyes', 'marco@handcraftedhaven.com', 'seller123', 'seller'),
  ('9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 'Sarah Chen', 'sarah@example.com', 'customer123', 'customer'),
  ('1b7d54bc-6e95-4f02-c457-d92b608f3a54', 'James Wilson', 'james@example.com', 'customer123', 'customer'),
  ('2c8e65cd-7fa6-4013-d568-ea3c71904b65', 'Amara Okonkwo', 'amara@handcraftedhaven.com', 'seller123', 'seller'),
  ('3d9f76de-80b7-4124-e679-fb4d82a15c76', 'Priya Patel', 'priya@example.com', 'customer123', 'customer'),
  ('4e1087ef-91c8-4235-f78a-0c5e93b26d87', 'Daniel Kim', 'daniel@example.com', 'customer123', 'customer');

INSERT INTO seller_profiles (id, user_id, bio, story, image_url) VALUES
  (
    '5f2198a0-a2d9-4346-889b-1d6fa4c37e98',
    '7e4a2189-3b62-4cdf-9124-a6f83d5c0721',
    'Ceramic artist specializing in hand-thrown terracotta pieces.',
    'My studio started in a small garage and grew into a community pottery space.',
    '/products/ceramic-vase.svg'
  ),
  (
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    '8f5b329a-4c73-4de0-a235-b7094e6d1832',
    'Artisan working with wood, leather, and natural fibers.',
    'Every item is shaped by hand using sustainably sourced materials.',
    '/products/wooden-bowl.svg'
  ),
  (
    '7143bac2-c4fb-4568-aabd-3f80c6e5901a',
    '2c8e65cd-7fa6-4013-d568-ea3c71904b65',
    'Jewelry maker and textile artist inspired by West African motifs.',
    'I blend traditional metalwork with contemporary designs for everyday wear.',
    '/products/textile-scarf.svg'
  );

INSERT INTO categories (id, name) VALUES
  ('32320450-7170-4256-b2ca-9367556d71ce', 'Ceramics'),
  ('8254cbd3-d50c-4679-bbce-409d7f70a21b', 'Textiles'),
  ('9365dce4-e61d-4780-ccdf-518e9081322c', 'Leather'),
  ('a476edf5-f72e-4891-dde0-62f9a192043d', 'Woodwork'),
  ('b587fe06-083f-4992-eef1-0730ab2a354e', 'Home'),
  ('c6980f17-1940-4aa3-ffa2-841bc3b4650f', 'Jewelry');

INSERT INTO products (id, seller_id, category_id, name, description, price, image_url) VALUES
  (
    'd7a91028-2a51-4bb4-00b3-952cd4c5761a',
    '5f2198a0-a2d9-4346-889b-1d6fa4c37e98',
    '32320450-7170-4256-b2ca-9367556d71ce',
    'Terracotta Glazed Vase',
    'Hand-thrown terracotta glazed vase with organic curves.',
    48.00,
    '/products/ceramic-vase.svg'
  ),
  (
    'e8ba2139-3b62-4cc5-11c4-a63de5d6872b',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    '8254cbd3-d50c-4679-bbce-409d7f70a21b',
    'Woven Willow Basket',
    'Natural woven willow basket with leather handles.',
    36.00,
    '/products/woven-basket.svg'
  ),
  (
    'f9cb324a-4c73-4dd6-22d5-b74ef6e7983c',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    '9365dce4-e61d-4780-ccdf-518e9081322c',
    'Hand-Stitched Leather Wallet',
    'Brown hand-stitched leather wallet on a cream background.',
    62.00,
    '/products/leather-wallet.svg'
  ),
  (
    '0adc435b-5d84-4ee7-33e6-c85f07f8a94d',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    'a476edf5-f72e-4891-dde0-62f9a192043d',
    'Olive Wood Serving Bowl',
    'Smooth olive wood serving bowl with visible grain.',
    54.00,
    '/products/wooden-bowl.svg'
  ),
  (
    '1bed546c-6e95-4ff8-44f7-d96018a9ba5e',
    '5f2198a0-a2d9-4346-889b-1d6fa4c37e98',
    'b587fe06-083f-4992-eef1-0730ab2a354e',
    'Sage & Cedar Candle',
    'Hand-poured candle in a glass jar with sage green wax.',
    28.00,
    '/products/hand-poured-candle.svg'
  ),
  (
    '2cfe657d-7fa6-4009-5508-ea7129bac6fa',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    '8254cbd3-d50c-4679-bbce-409d7f70a21b',
    'Hand-Dyed Linen Scarf',
    'Soft hand-dyed linen scarf in warm beige tones.',
    44.00,
    '/products/textile-scarf.svg'
  ),
  (
    '3d0f768e-80b7-411a-6619-fb823abc7d70',
    '5f2198a0-a2d9-4346-889b-1d6fa4c37e98',
    '32320450-7170-4256-b2ca-9367556d71ce',
    'Rustic Stoneware Mug',
    'Wheel-thrown mug with a speckled glaze and comfortable handle.',
    32.00,
    '/products/ceramic-vase.svg'
  ),
  (
    '4e20879f-91c8-422b-772a-0c934bcdef81',
    '7143bac2-c4fb-4568-aabd-3f80c6e5901a',
    '8254cbd3-d50c-4679-bbce-409d7f70a21b',
    'Macrame Wall Hanging',
    'Neutral-toned macrame piece for living room or studio walls.',
    58.00,
    '/products/textile-scarf.svg'
  ),
  (
    '5f3198a0-a2d9-433c-883b-1da45cde0092',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    '9365dce4-e61d-4780-ccdf-518e9081322c',
    'Leather Journal Cover',
    'Refillable journal wrap with brass snap closure.',
    45.00,
    '/products/leather-wallet.svg'
  ),
  (
    '6042a9b1-b3ea-444d-994c-2eb56def01a3',
    '6032a9b1-b3ea-4457-99ac-2e7fb5d48f09',
    'a476edf5-f72e-4891-dde0-62f9a192043d',
    'Walnut Cutting Board',
    'Edge-grain cutting board finished with food-safe oil.',
    78.00,
    '/products/wooden-bowl.svg'
  ),
  (
    '7153bac2-c4fb-455e-aa5d-3fc67ef012b4',
    '5f2198a0-a2d9-4346-889b-1d6fa4c37e98',
    'b587fe06-083f-4992-eef1-0730ab2a354e',
    'Lavender Soy Candle Set',
    'Set of three mini candles with dried lavender tops.',
    35.00,
    '/products/hand-poured-candle.svg'
  ),
  (
    '8264cbd3-d50c-466f-bb6e-40d78f0123c5',
    '7143bac2-c4fb-4568-aabd-3f80c6e5901a',
    'c6980f17-1940-4aa3-ffa2-841bc3b4650f',
    'Hammered Copper Earrings',
    'Lightweight drop earrings with a warm copper patina.',
    52.00,
    '/products/woven-basket.svg'
  );

INSERT INTO reviews (id, product_id, user_id, rating, comment) VALUES
  ('f8389ade-6b2c-4e0a-9f1d-2c7b41056e21', 'd7a91028-2a51-4bb4-00b3-952cd4c5761a', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 5, 'Beautiful craftsmanship and perfect size for fresh flowers.'),
  ('8920b4cf-7c3d-4f1b-a02e-3d8c52167f32', 'e8ba2139-3b62-4cc5-11c4-a63de5d6872b', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 5, 'Sturdy basket with a lovely natural finish.'),
  ('9a31c5d0-8d4e-4012-b13f-4e9d63278043', 'f9cb324a-4c73-4dd6-22d5-b74ef6e7983c', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 5, 'Excellent leather quality and stitching.'),
  ('ab42d6e1-9e5f-4123-c240-5f0e74389154', '0adc435b-5d84-4ee7-33e6-c85f07f8a94d', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 4, 'Great bowl for serving, slightly smaller than expected.'),
  ('bc53e7f2-af60-4234-d351-601f85490265', '1bed546c-6e95-4ff8-44f7-d96018a9ba5e', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 5, 'Smells amazing and burns evenly.'),
  ('cd64f803-b071-4345-e462-7120965a1376', '2cfe657d-7fa6-4009-5508-ea7129bac6fa', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 5, 'Soft fabric and beautiful earthy colors.'),
  ('de75a914-c182-4446-f573-8231a76b2487', 'd7a91028-2a51-4bb4-00b3-952cd4c5761a', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 4, 'Lovely glaze color, arrived well packaged.'),
  ('ef86ba25-d293-4557-a684-9342b87c3598', 'e8ba2139-3b62-4cc5-11c4-a63de5d6872b', '3d9f76de-80b7-4124-e679-fb4d82a15c76', 5, 'Perfect for storing yarn and craft supplies.'),
  ('f097cb36-e3a4-4668-b795-a453c98d46a9', 'f9cb324a-4c73-4dd6-22d5-b74ef6e7983c', '4e1087ef-91c8-4235-f78a-0c5e93b26d87', 5, 'Fits all my cards and ages beautifully.'),
  ('01a8dc47-f4b5-4779-c8a6-b564da9e57ba', '0adc435b-5d84-4ee7-33e6-c85f07f8a94d', '3d9f76de-80b7-4124-e679-fb4d82a15c76', 5, 'The grain pattern is stunning in person.'),
  ('12b9ed58-a5c6-488a-d9b7-c675ebaf68cb', '1bed546c-6e95-4ff8-44f7-d96018a9ba5e', '4e1087ef-91c8-4235-f78a-0c5e93b26d87', 4, 'Relaxing scent, burns a bit faster than expected.'),
  ('23caf069-b6d7-499b-eac8-d786fcba79dc', '2cfe657d-7fa6-4009-5508-ea7129bac6fa', '3d9f76de-80b7-4124-e679-fb4d82a15c76', 5, 'Lightweight and pairs well with neutral outfits.'),
  ('34db107a-c7e8-4aac-fbd9-e8970dcb8aed', '3d0f768e-80b7-411a-6619-fb823abc7d70', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 5, 'My daily coffee mug — holds heat well.'),
  ('45ec218b-d8f9-4bbd-acda-f9a81edc9bfe', '3d0f768e-80b7-411a-6619-fb823abc7d70', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 4, 'Unique shape, slightly heavier than typical mugs.'),
  ('56fd329c-e90a-4cce-bdeb-0ab92fedac0f', '4e20879f-91c8-422b-772a-0c934bcdef81', '3d9f76de-80b7-4124-e679-fb4d82a15c76', 5, 'Adds warmth to our entryway instantly.'),
  ('670e43ad-fa1b-4ddf-cef0-1bca301ebda0', '4e20879f-91c8-422b-772a-0c934bcdef81', '4e1087ef-91c8-4235-f78a-0c5e93b26d87', 5, 'Detailed knot work and very well made.'),
  ('781f54be-ab2c-4ee0-dfa1-2cdb412fcea1', '5f3198a0-a2d9-433c-883b-1da45cde0092', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 4, 'Beautiful cover, journal insert sold separately.'),
  ('892065cf-bc3d-4ff1-eab2-3dec5230dfb2', '6042a9b1-b3ea-444d-994c-2eb56def01a3', '1b7d54bc-6e95-4f02-c457-d92b608f3a54', 5, 'Solid board with no warping after weeks of use.'),
  ('9a3176d0-cd4e-4002-fbc3-4efd6341e0c3', '7153bac2-c4fb-455e-aa5d-3fc67ef012b4', '3d9f76de-80b7-4124-e679-fb4d82a15c76', 5, 'Gift set that impressed everyone at the party.'),
  ('ab4287e1-de5f-4113-acd4-5afe7452f1d4', '8264cbd3-d50c-466f-bb6e-40d78f0123c5', '4e1087ef-91c8-4235-f78a-0c5e93b26d87', 5, 'Comfortable all day and get lots of compliments.'),
  ('bc5398f2-ef60-4224-bde5-6b0f856031e5', '8264cbd3-d50c-466f-bb6e-40d78f0123c5', '9a6c43ab-5d84-4ef1-b346-c81a5f7e2943', 4, 'Elegant design, wish they came in a gift box.');
