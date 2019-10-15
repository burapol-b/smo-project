showTable();
compare();

function showTable() {
  db.collection("Lend_log")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        showData(doc);
      });
    });
}

function showData(lendItem) {
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

  cell1.innerHTML = lendItem.data().item_id;
  cell2.innerHTML = lendItem.data().piece;
  cell3.innerHTML = lendItem.data().stu_id;
  cell4.innerHTML = lendItem.data().fname + " " + lendItem.data().lname;
  cell5.innerHTML = lendItem.data().tel;
  cell6.innerHTML = lendItem.data().lend_date;
  cell7.innerHTML = lendItem.data().ret_date;

  let btn = document.createElement("button");
  btn.textContent = "ลบข้อมูล";
  btn.setAttribute("class", "btn btn-danger");
  btn.setAttribute("data-id", lendItem.id);
  cell8.appendChild(btn);

  btn.addEventListener("click", e => {
    let id = e.target.getAttribute("data-id");
    db.collection("Lend_log")
      .doc(id)
      .delete();
  });
}

function compare() {
  var sub_butt = document.getElementById("butt_sub");
  sub_butt.addEventListener("click", e => {
    e.preventDefault();
    var f_name = document.getElementById("fname_field").value;
    var l_name = document.getElementById("lname_field").value;
    var stuID = document.getElementById("stuID_field").value;
    var tel_num = document.getElementById("tel_field").value;
    var item = document.getElementById("select_button").value;
    var lend = document.getElementById("lendDate_form").value;
    var ret = document.getElementById("retDate_form").value;
    var piece_f = document.getElementById("piece_form").value;

    db.collection("Lend_log").add({
      fname: f_name,
      lname: l_name,
      stu_id: stuID,
      tel: tel_num,
      item_id: item,
      lend_date: lend,
      ret_date: ret,
      faculty: "EN",
      piece: piece_f
    });

    getRemain(item, piece_f);

    function getRemain(item_id, piece) {
      db.collection("item_status")
        .where("item_id", "==", item_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            var itemRemain = doc.data().item_remain;
            changeRemain(itemRemain, piece);
            db.collection("item_status")
              .doc(doc.id)
              .update({ item_remain: changeRemain(itemRemain, piece) });
          });
        });

      function changeRemain(remain, piece) {
        var ch_remain = remain - piece;
        console.log(ch_remain);
        return ch_remain;
      }
    }

    /*
    function getDocID(itemid){
        db.collection("Lend_log")
        .where('item_id','==',itemid)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            return doc.id;
          });
        }); 
    }
    */
  });
}
