import { fromDebug } from "bytebuffer";

function compare() {
  alert();
  var sub_butt = document.getElementById("butt_sub");
  sub_butt.addEventListener("click", e => {
    var f_name = document.getElementById("fname_field").value;
    var l_name = document.getElementById("lname_field").value;
    var stuID = document.getElementById("stuID_field").value;
    var tel_num = document.getElementById("tel_field").value;
    var item = document.getElementById("select_button").value;
    var lend = document.getElementById("lendDate_form").value;
    var ret = document.getElementById("retDate_form").value;
    var piece_f = document.getElementById("piece_form").value;
    var facul = document.getElementById('faculty_field').value;

    db.collection("Lend_log").add({
      fname: f_name,
      lname: l_name,
      stu_id: stuID,
      tel: tel_num,
      item_id: item,
      lend_date: lend,
      ret_date: ret,
      faculty: facul,
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
            db.collection("item_status")
              .doc(doc.id)
              .update({ item_remain: changeRemain(itemRemain, piece) });
          });
        });

      function changeRemain(remain, piece) {
        var ch_remain = remain - piece;
        return ch_remain;
      }
    }

  });
}

