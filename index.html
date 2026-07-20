function calc(){

    let kouyou =
    Number(document.getElementById("kouyou").value);

    let count =
    Number(document.getElementById("count").value);

    let current =
    Number(document.getElementById("current").value);


    // 高揚
    let bonus = kouyou * 0.2;


    // 即時士気
    if(document.getElementById("shiki2").checked){
        bonus += 1.5;
    }

    if(document.getElementById("kohou2").checked){
        bonus += 1;
    }

    if(document.getElementById("hougu").checked){
        bonus += 0.75;
    }


    // 士気流派3発動
    let shiki3 =
    Number(document.getElementById("shiki3").value);


    // 区間回復計算
    function recovery(start,end){

        let value = 0;

        for(let c=start; c>end; c--){

            if(shiki3 > 0 && c <= shiki3){

                value += (1 / 4.2) * 1.3;

            }else{

                value += 1 / 4.2;

            }
        }

        return value;
    }


    // 現在まで
    let nowGain = recovery(99,count);

    let nowTotal =
    current + bonus + nowGain;


    // 残り10まで（有効士気）
    let effectiveGain =
    recovery(99,10);

    let effectiveTotal =
    bonus + effectiveGain;


    // 10～0の死に士気
    let deadGain =
    recovery(10,0);


    // 0まで全部
    let allTotal =
    bonus + recovery(99,0);



    document.getElementById("result").innerHTML =

    "<div class='total'>" +
    "0カウントまでの総士気<br>" +
    allTotal.toFixed(2) +
    "</div>" +

    "<div class='now'>" +
    "現在使用可能士気<br>" +
    nowTotal.toFixed(2) +
    "</div>" +

    "<div class='effective'>" +
    "残り10カウント時点<br>" +
    "有効使用可能士気<br>" +
    effectiveTotal.toFixed(2) +
    "</div>" +

    "<div class='dead'>" +
    "死に士気（残り10～0）<br>" +
    deadGain.toFixed(2) +
    "</div>";

}
