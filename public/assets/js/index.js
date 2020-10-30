$(document).ready(function () {
    
    // Pod
    $("#createPodForm").on("submit",event=>{
        event.preventDefault();
        console.log('Pod created!');
        $.ajax({
            method:"GET",
            url:"/api/pods",
        }).then(data=>{
            console.log(data);
            const podObj = {
                name: $("#name").val(),
                date: $("#date").val(),
                time: $("#time").val(),
                zip: $("#zip").val(),
                contact: $("#contact").val(),
                note: $("#note").val()
            }
            console.log(podObj)
            $.ajax({
                method:"POST",
                url:"/api/pods",
                data:podObj
            }).then(apiRes=>{
                console.log(apiRes);
                window.location.href= "/home"
            })
        })

    })

    $(".editPodBtn").on("click",function(event){
        const podId = $(this).data("podid");
        console.log($(this).data("podid"));
        $.ajax({
            method:"GET",
            url:`/api/pods/${podId}`,
        }).then(data=>{
            console.log(data);
            let pod = data[0]
            console.log(pod);
            let name = pod.name
            console.log(pod.name)
            $("#editname-"+podId).val(name)
            let date = pod.date
            $("#editdate-"+podId).val(date)
            let time = pod.time
            $("#edittime-"+podId).val(time)
            let zip = pod.zip
            $("#editzip-"+podId).val(zip)
            let contact = pod.contact
            $("#editcontact-"+podId).val(contact)
            let note = pod.note
            $("#editnote-"+podId).val(note)
        });
    })
    $(".savePodBtn").on("click",function(event){
        event.preventDefault();
        console.log('Pod edited!');
        const podId = $(this).data("podid");
        const podObj = {
            name: $("#editname-"+podId).val(),
            date: $("#editdate-"+podId).val(),
            time: $("#edittime-"+podId).val(),
            zip: $("#editzip-"+podId).val(),
            contact: $("#editcontact-"+podId).val(),
            note: $("#editnote-"+podId).val()
        }
        console.log(podObj)
        $.ajax({
            method:"PUT",
            url:`/api/pods/${podId}`,
            data:podObj
        }).then(apiRes=>{
            console.log(apiRes);
            window.location.href= "/home"
        })
    })
    
    $(".delPodBtn").on("click",function(event){
        console.log('Pod deleted!');
        const podId = $(this).data("podid");
        $.ajax({
            method:"DELETE",
            url:`/api/pods/${podId}`
        }).then(data=>{
           window.location.reload();
        })
    })

    // Kid API
    $(".createKidBtn").on("click",function(event){
        event.preventDefault();
        const podId = $(this).data("podid");
        console.log('Kid created!');
        const kidObj = {
            first: $("#first-"+podId).val(),
            last: $("#last-"+podId).val(),
            school: $("#school-"+podId).val(),
            grade: $("#grade-"+podId+"option:selected").val(),
            KidId: podId
        }
        console.log(kidObj)
        $.ajax({
            method:"POST",
            url:"/api/kids",
            data:kidObj
        }).then(apiRes=>{
            console.log(apiRes);
            window.location.href= "/home"
        })
    })

    // $("#editKidBtn").on("click",function(event){
    //     event.preventDefault();
    //     const podId = $(this).data("podid");
    //     console.log('Kid edited!');
    //     const kidObj = {
    //         first: $("#first-"+podId).val(),
    //         last: $("#last-"+podId).val(),
    //         school: $("#school-"+podId).val(),
    //         grade: $("#grade-"+podId+"option:selected").val(),
    //         KidId: podId
    //     }
    //     const kidId = $(this).data("kidid");
    //     console.log(kidId)
    //     $.ajax({
    //         method:"PUT",
    //         url:`/api/kids/${kidId}`,
    //         data:kidObj
    //     }).then(apiRes=>{
    //         console.log(apiRes);
    //         window.location.href= "/home"
    //     })
    // })
    
    $(".delKidBtn").on("click",function(event){
        console.log('Kid deleted!');
        const kidId = $(this).attr("data-kidid");
        $.ajax({
            method:"DELETE",
            url:`/api/kids/${kidId}`
        }).then(data=>{
           window.location.reload();
        })
    })
    
    M.AutoInit();

    $(".datepicker").datepicker({format: 'yyyy-mm-dd' });
});
