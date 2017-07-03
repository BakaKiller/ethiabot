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
    <link href="template/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="template/css/freelancer.min.css" rel="stylesheet">

    <link href="template/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
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

function make_bar($cat) {
    $bar = '<div class="bar row">';
    $bar .= '<div class="cat col-xs-10 col-sm-10 col-md-10 col-lg-10">' . $cat . '</div>';
    $bar .= '<div class="btns col-xs-2 col-sm-2 col-md-2 col-lg-2">';
    $bar .= '<button class="btn btn-success" name="' . $cat . '_valid"><i class="fa fa-check"></i></button>';
    $bar .= '<button class="btn btn-danger" name="' . $cat . '_cancel"><i class="fa fa-times"></i></button>';
    $bar .= '</div>';
    $bar .= '</div>';
    return $bar;
}