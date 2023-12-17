function getDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes()

    
    return +hours+':'+minutes+' '+day+'/'+month+'/'+year;
}