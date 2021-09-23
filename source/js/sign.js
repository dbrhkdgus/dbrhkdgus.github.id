window.onload = function(){

    function newPage()  {
        window.location.href = 'sign-in.html'
      }

// sign-in

$(loginBtn).click(e=>{
    // console.log('로컬 스토리지에서 비교하여 검사하기')
    let $id = $(userid);
    let $pwd = $(password);

    // console.log($id.val())
    // console.log($pwd.val())
    if($id.val() == '') return;

    let userArr = JSON.parse(localStorage.getItem('users'));
    // console.log(userArr);

    let flag = false;

    for(let i = 0; i < userArr.length; i++){
        
        if($id.val() == userArr[i]['id']){
            flag = true;
            if($pwd.val() == userArr[i]['pwd']){
                alert('로그인 성공');
                $id.val('');
                $pwd.val('');
                break;
            }else{
                alert('비밀번호가 일치하지 않습니다.')
                $pwd.select();
                break;
            }
        }else{
            // alert('미등록 아이디입니다.')
            $id.select();
            
        }
    }

    if(!flag){
        alert('미등록 아이디입니다.')
    }
    
});

 $(register).click(e=>{
     
     if($(userid).val() == ''){
        $(register).css('cursor','pointer')
        $('.registerbox').css('text-align', 'center')
        $('.signHidden').addClass('signActive');
        $('.ssnHidden').removeClass('ssnHidden').addClass('ssn-box')
        $(loginBtn).addClass('loginBtnHidden')

        }else{
            $(register).attr('type','submit')
        }
 });


document.memberFrm.onsubmit = function(){
    
    var userId = document.getElementById("userid");
    var pwd = document.getElementById("password");
    var pwdCheck = document.getElementById("pwdCheck");
    var userName = document.getElementById("username");
    var email = document.getElementById("email");
    var ssn1 = document.getElementById("ssn1");
    var ssn2 = document.getElementById("ssn2");
    var tel1 = document.getElementById("tel1");
    var tel2 = document.getElementById("tel2");
    var tel3 = document.getElementById("tel3");
 
    //1.아이디검사
    //첫글자는 반드시 영소문자로 이루어지고, 
    //숫자가 하나이상 포함되어야함.
    //아이디의 길이는 4~12글자사이

    if(userId.value == '' || userId.value == null){
        alert('아이디는 필수 항목입니다.');
        return false;
    }else if(!/^[a-z]/.test(userId.value)){
        alert('아이디의 첫 글자는 영소문자로 시작해야 합니다.');
        return false;
    }else if(!/\d/.test(userId.value)){
        alert('아이디는 숫자가 하나 이상 포함되어야 합니다.');
        return false;
    }else if(!/.{4,12}/.test(userId.value)){
        alert('아이디의 길이는 4~12글자 사이여야 합니다..');
        return false;
    }

    var regExp1 = /^[a-z][a-z\d]{3,11}$/;
    var regExp2 = /[0-9]/;
    
        
    var regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\*!&]/];
 
    for(let i = 0; i < regExpArr.length; i++){
        console.log('정규표현 검사')
        if(!regExpTest(regExpArr[i], pwd, "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다.")){
            return false;
        }
    }
    
    //비밀번호일치여부
    if(!isEqualPwd()){
        return false;
    }
 
    //3.이름검사
    //한글2글자 이상만 허용. [가-힣] 으로 해도되긴 하지만 자음만(ㄱㄴㄷㄹ)있으면 필터링이 안됨
    var regExp3 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
    if(!regExpTest(regExp3,userName,"한글2글자이상 입력하세요."))
        return false;
 
    //4.주민번호체크
    var regExp4 = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])$/;
    var regExp5 = /^[1234]\d{6}$/;
    if(!regExpTest(regExp4,ssn1,"숫자만 입력하세요."))
        return false;
    if(!regExpTest(regExp5,ssn2,"숫자만 입력하세요."))
        return false;
 
    if(!ssnCheck(ssn1.value,ssn2.value)){
        alert("올바른 주민번호가 아닙니다.");
        return false;
    }
 
    //5.이메일 검사
    // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
    // 1글자 이상(주소). 글자 가 1~3번 반복됨
    if(!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다."))
            return false;
 
    //6. 전화번호 검사
    // 전화번호 앞자리는 010, 두번째 자리는 3~4자리 숫자, 세번째 자리는 4자리 숫자
    if (!regExpTest(/^010$/, tel1, "번호 2자리 이상 입력"))
            return false;
    if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
            return false;
    if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
            return false;
    
            // 객체생성
            function User(id,pwd,name,ssn,tel,email){
                this.id = id;
                this.pwd = pwd;
                this.name = name;
                this.ssn = ssn;
                this.tel = tel;
                this.email = email;

            }
            let newUser = new User(userId.value, pwd.value, userName.value, ssn1.value + ssn2.value, tel1.value + tel2.value + tel3.value, email.value);

            // 웹 스토리지에 저장하기.

            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);

            localStorage.setItem('users',JSON.stringify(users));

            // 폼 초기화
            document.memberFrm.reset();
            newPage();

                    
    return true;
 }
 
 function ssnCheck(ssn1, ssn2){
    var ssn = ssn1+ssn2;
 
    var total = 0;
    for(var i=0; i<12; i++){
        if(i<8){
            total += parseInt(ssn.substr(i,1))*(i+2);
        }
        else {
            total += parseInt(ssn.substr(i,1))*(i-6);
        }
    }
    //마지막수와 비교할 수 구하기
    var result = (11-(total%11))%10;
    //마지막수(13번째 자리)
    var num13 = parseInt(ssn.substr(12,1));
    
    //결과
    if(result==num13)
        return true;
    else 
        return false;
 }
 
 function isEqualPwd(){
    if(pwdCheck.value == password.value){
        return true;
    }
    else{
        alert("비밀번호가 일치하지 않습니다.");
        password.select();
        return false;
    }
 }
 
 
 function regExpTest(regExp, el, msg){
    //  console.log('펑션`')
    if(regExp.test(el.value)){
        
        return true;
    }else{
        //적합한 문자열이 아닌 경우
        
        alert(msg);
        el.value="";
        el.focus();
        return false;
    }
    
 }


};