$(document).ready(function() {
    //Last updated time .
    var lastUpdatedTime = new Date();
    var timeInterval = 30;

    function timeDifference(lastUpdatedTime) {
        return Math.floor((new Date() - lastUpdatedTime) / 1000 / 60);
    }

    function hanldeSession() {
        if (timeDifference(lastUpdatedTime) >= timeInterval) {
            console.log("session handler");
            $.ajax({
                url: `../lib/checkSession.php?q=setsession`,
                success: function(r) {
                    console.log(r);
                    lastUpdatedTime = new Date();
                },
                error: function(err) {
                    console.error(err);
                },
            });
        }
    }

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function(e) {
        hanldeSession();
    });
    $(this).keypress(function(e) {
        hanldeSession();
    });
});