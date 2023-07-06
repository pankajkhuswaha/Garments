
const options = {
    method: 'POST',
    url: 'https://api.easyship.com/rate/v1/rates',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer sand_ElyJ/Mna0V9IjI8v0vOtaggb7CwEVkcE/kKsQbcso1E='
    },
    body: {
      origin_country_alpha2: 'IN',
      origin_city: 'New Delhi',
      origin_postal_code: '110001',
      destination_country_alpha2: 'IN',
      destination_city: 'Mumbai',
      destination_postal_code: '400001',
      taxes_duties_paid_by: 'Sender',
      is_insured: false,
      items: [
        {
          actual_weight: 2,
          height: 4,
          width: 4,
          length: 6,
          category: 'mobile',
          declared_currency: 'INR',
          declared_customs_value: 0,
          quantity: 1
        }
      ],
      output_currency: 'INR',
      apply_shipping_rules: true,
      box: {length: 7, width: 5, height: 5},
      total_actual_weight: 1
    },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });