db.collection("item_status")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      showData(doc);
    });
  });

function showData(doc) {
  var table = document.getElementById("tbresult");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = doc.data().item_id;
  cell2.innerHTML = doc.data().item_name;
  cell3.innerHTML = doc.data().item_total;
  cell4.innerHTML = doc.data().item_remain;
}
