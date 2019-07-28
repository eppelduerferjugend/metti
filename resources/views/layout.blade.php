<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Metti 🍝 - @yield('title')</title>
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
</head>

<body class="@yield('bodyClass')">
    @include('navigation')

    <div class="container-fluid" id="app">
        @yield('content')
    </div>
    <script src="{{ elixir('js/app.js') }}"></script>
</body>

</html>
