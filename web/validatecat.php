<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 03/07/2017
 * Time: 11:41
 */

require_once('lib.php');

$waitingcats = get_cat_list(true);
$cats = get_cat_list();
$gifs = "";

if (isset($_POST['ajax']) && $_POST['ajax'] && isset($_POST['data']) && $_POST['data']) {
    $data = json_decode($_POST['data']);
    try {
        switch ($data->action) {
            case 'valid':
                $cats[] = $data->name;
            case 'delete':
                unset($waitingcats[$data->key]);
                break;
            default:
                throw new Exception('Mauvais message wesh');
        }
        sort($waitingcats);
        set_cat_list(true, $waitingcats);
        set_cat_list(false, $cats);
    } catch (Exception $e) {
        echo 'Error : ' . $e->getMessage();
        exit;
    }
    echo "ok";
} else {
    echo print_header('Valider les nouvelles catégories');
    echo '<style>
.bar:nth-child(1) {
    border-top: none;
}
.bar {
    width:100%;
    border-top: solid 1px #cccccc;
    padding: 3px;
    margin:0;
}
.bar .cat {
    font-size: 20px;
}
</style>';
    echo '<section class=".container-fluid">';
    foreach ($waitingcats as $key => $waitingcat) {
        echo make_bar($waitingcat, $key);
    }
    echo '</section>';
    ?>
        <script>
            function getinfos(node) {
                var key = $(node).attr('data-key');
                var name = $(node).attr('data-cat');
                var action = $(node).attr('name');
                var result = '{"key":"' + key + '","name":"' + name + '","action":"' + action + '"}';
                return result;
            }
            $(document).ready(function() {
                $('button[name="valid"], button[name="delete"]').click(function () {
                    var infos = getinfos(this);
                    var button = $(this);
                    button.children("i").attr('class', 'fa fa-spinner fa-pulse');
                    button.parent().children('button').attr('disabled', true);
                    $.post(window.location.href, {ajax:true, data:infos}, function(data) {
                        if (data === "ok") {
                            button.parent().parent().fadeOut();
                        } else {
                            alert(data);
                        }
                    })
                });
            });
        </script>
    <?php
    echo print_footer();
}