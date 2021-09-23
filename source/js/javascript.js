window.onload = function(){

    function animation(){
        var sections; //섹션 유사배열
        var winH; //윈도우의 높이

        //모듈 초기화 함수
        function initModule(){
            sections = document.querySelectorAll(".hidden")
            winH = window.innerHeight;
            // console.log(window.innerHeight);
            _addEventHandlers();
        }

        //이벤트 핸들러 만드는 함수
        function _addEventHandlers(){
            window.addEventListener("scroll", _checkPosition);
            window.addEventListener("scroll", move);
            window.addEventListener("resize", initModule);
        }

        //포지션 체크 함수
        function _checkPosition(){
            
            for(var i = 0; i < sections.length; i++){
                //각 섹션의 top값
                //스크롤을 내릴 수록 값이 줄어들고 winH의 탑과 만나면 0이된다
                var posFromWinTop = sections[i].getBoundingClientRect().top;
                var posFromWinBottom = sections[i].getBoundingClientRect().bottom;
                if(!sections[i].classList.contains('active')){
                    //페이드인 줄 시점 : posFromWinTop - winH < 0
                    if(winH > posFromWinTop){
                        sections[i].classList.add("active");
                        
                    }
                }
                // // 반대코드
                // else {
                //     if(sections[i].classList.contains('active'))
                //         if(winH < posFromWinBottom){
                //             sections[i].classList.remove('active');
                //         }
                // }
            }
        }
        //animation()이 객체로 함수를 리턴
        return{
            init : initModule
        }

    }
    //animation()의 init메소드 실행
    animation().init();

    //스크롤 제어
    function move(){

        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;
        elm.forEach(function(item, index){
            item.addEventListener('mousewheel', function(event){
                event.preventDefault();
                let delta = 0;
                
                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } 
                else if (event.detail)
                delta = -event.detail / 3;
                
                let moveTop = window.scrollY;
                let elmSelector = elm[index];
                
                // wheel down : move to next section
                if (delta < 0){
                    if (elmSelector !== elmCount-1){
                        try{
                            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                        }catch(e){}
                    }
                }
                
                // wheel up : move to previous section
                else{
                    if (elmSelector !== 0){
                        try{
                            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                        }catch(e){}
                    }
                }
                
                const body = document.querySelector('html');
                window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
            });
        });
    }
        

    // .pvideo 최초 src설정
    const $pvideo = $('.pvideo');
    const projectArr = ['https://www.youtube.com/embed/pPyKIWaXKeo' , 'https://www.youtube.com/embed/oOz02odX6u4'];
    const projectImgArr = ['https://i.ibb.co/6tbBMX5/project-cover1.png' , 'https://i.ibb.co/YX4qKCx/project-cover2.png'];
    $pvideo
    .attr('src',projectArr[0])
    // .attr('poster',projectImgArr[0]);
    $('#p-0').addClass('pjtActive')

    // left/rightSideButton 관리
    
    const $lsb = $(leftSideButton);
    const $rsb = $(rightSideButton);
    
    $lsb.on('click',lsb__click).css('cursor','pointer');
    $rsb.on('click',rsb__click).css('cursor','pointer');
    
    // 프로젝트 설명란 

    $('#p-1 p:nth-child(2)')
    .css('text-align','left')
    .css('padding-left','30px');

    $('#p-2 p')
    .css('text-align','left')
    .css('padding-left','30px')
    .css('padding-top','50px')
 





    let i = 0;
    
    
    function lsb__click(e){
        
        if(i == 0) return;

        $pvideo
        .attr('src',projectArr[--i])
        // .attr('poster',projectImgArr[i]);
        console.log($('#p-'+i))
        $('#p-'+ i).addClass('pjtActive').siblings().removeClass('pjtActive');


    };
    function rsb__click(e){
        if(i == 1) return;
       
        $pvideo
        .attr('src',projectArr[++i])
        // .attr('poster',projectImg + num);
        $('#p-'+  i).addClass('pjtActive').siblings().removeClass('pjtActive');
    };

    
   
      

    
};
