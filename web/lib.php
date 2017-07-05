<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 03/07/2017
 * Time: 14:32
 */

/**
 * @param $title string Title of the HTML page
 * @return string header content
 */
function print_header($title) {
    return '<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://use.fontawesome.com/8580bafaac.js"></script>
    <script src="https://use.fontawesome.com/8580bafaac.js"></script>
    <title>' . $title . '</title>
    <style>
    body.index.index-custom {
        background-color: #f4f4f4;
    }
    .index-custom section {
        margin: 20px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        padding: 12px;
        border-radius: 2px;
    }
</style>
</head>
<body id="page-top" class="index index-custom">';
}

function print_footer() {
    return '</body>
</html>';
}

function make_bar($cat, $key = 0) {
    $bar = '<div class="bar row">';
    $bar .= '<div class="cat col-xs-10 col-sm-10 col-md-10 col-lg-10">' . $cat . '</div>';
    $bar .= '<div class="btns col-xs-2 col-sm-2 col-md-2 col-lg-2">';
    $bar .=
            '<button class="btn btn-success" name="valid" data-key="' . $key . '" data-cat="' . $cat . '">
                <i class="fa fa-check"></i>
            </button>';
    $bar .=
            '<button class="btn btn-danger" name="delete" data-key="' . $key . '" data-cat="' . $cat . '">
                <i class="fa fa-times"></i>
            </button>';
    $bar .= '</div>';
    $bar .= '</div>';
    return $bar;
}

function get_cat_list($waiting = false) {
    if ($waiting) {
        return json_decode(file_get_contents('../waitingcats.json'));
    } else {
        return json_decode(file_get_contents('../cats.json'));
    }
}

function set_cat_list($waiting, $catlist) {
    return file_put_contents('../' . ($waiting ? 'waiting' : '') . 'cats.json', json_encode($catlist));
}