db.collection("Lend_log")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      showData(doc);
    });
  });

function showData(lendItem) {
  function getNameItemstatus(lendItem) {
    db.collection("item_status")
      .where("item_id", "==", lendItem.data().item_id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          cell1.innerHTML =
            lendItem.data().item_id + "  " + doc.data().item_name;
        });
      });
  }

  getNameItemstatus(lendItem);
  var table = document.getElementById("tbresult");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell2.innerHTML = lendItem.data().piece;
  cell3.innerHTML = lendItem.data().stu_id;
  cell4.innerHTML = lendItem.data().fname + " " + lendItem.data().lname + "  (" + lendItem.data().faculty + ")";
  cell5.innerHTML = lendItem.data().tel;
  cell6.innerHTML = lendItem.data().lend_date;
  cell7.innerHTML = lendItem.data().ret_date;

  let btn = document.createElement("button");
  btn.textContent = "ลบ";
  btn.setAttribute("class", "btn btn-danger");
  btn.setAttribute("data-id", lendItem.id);
  btn.setAttribute("data-piece", lendItem.data().piece);
  btn.setAttribute("data-itemID", lendItem.data().item_id);

  cell8.appendChild(btn);

  btn.addEventListener("click", e => {
    let id = e.target.getAttribute("data-id");
    let piece = e.target.getAttribute("data-piece");
    let item = e.target.getAttribute("data-itemID");

    db.collection("Lend_log")
      .doc(id)
      .delete();
      delLend(piece, item);
  });

  function delLend(piece, item_id) {
    db.collection("item_status")
      .where("item_id", "==", item_id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var itemRemain = doc.data().item_remain;

          db.collection("item_status")
            .doc(doc.id)
            .update({ item_remain: plusRemain(itemRemain, piece) });
        });
      });

    function plusRemain(remain, piece) {
      var int_piece = parseInt(piece);
      var ch_remain = remain + int_piece;

      console.log(ch_remain);
      return ch_remain;
    }
  }
}
