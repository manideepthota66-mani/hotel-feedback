app.get("/admin", async (req, res) => {
  const data = await Feedback.find();

  let html = `
  <html>
  <head>
    <title>Admin Dashboard</title>
    <style>
      body { font-family: Arial; background:#f4f6f9; padding:20px; }
      h1 { text-align:center; }
      .card { background:#fff; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1); margin-bottom:20px; }
      table { width:100%; border-collapse:collapse; }
      th, td { padding:12px; border-bottom:1px solid #ddd; text-align:center; }
      th { background:#007bff; color:#fff; }
      tr:hover { background:#f1f1f1; }
      .stats { display:flex; gap:20px; justify-content:center; margin-bottom:20px; }
      .stat-box { background:#007bff; color:white; padding:15px 25px; border-radius:8px; }
    </style>
  </head>
  <body>

    <h1>📊 Feedback Dashboard</h1>

    <div class="stats">
      <div class="stat-box">Total: ${data.length}</div>
    </div>

    <div class="card">
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Service</th>
          <th>Food</th>
          <th>Comments</th>
        </tr>
  `;

  data.forEach(item => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.age}</td>
        <td>${item.service}</td>
        <td>${item.food}</td>
        <td>${item.comments}</td>
      </tr>
    `;
  });

  html += `
      </table>
    </div>

  </body>
  </html>
  `;

  res.send(html);
});