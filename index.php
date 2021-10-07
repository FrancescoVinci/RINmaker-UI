<?php 
  session_start();
  $_SESSION['sessIdUser'] = session_id();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    <link rel="stylesheet" href="style.css">


    <title>RINmaker</title>
  </head>

  <body>
    
    <script defer="" src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    <script type="text/javascript" src="js/functions.js"></script>
    <script type="text/javascript" src="js/checkForm.js"></script>
    <script type="text/javascript" src="js/browserDetection.js"></script>

    
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #7386d5">
      <div class="container">
        <a class="navbar-brand" href="../RINmaker/index.php">
          <img src="img/navicon2.png" width="30" height="30" class="d-inline-block align-top" alt="">
          RINmaker
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../RINmaker/index.php">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../RINmaker/about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../RINmaker/help.html">Help</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br>
    <main role="main" class="container w-75 p-3" style="background-color: #F8F8F8">
      <div class="jumbotron">
        <br>
        <img src="img/protein6.png" class="img-fluid" width="536" height="219">
        <h1 class="display-6">Ca' Foscari University of Venice</h1>

        <p class="lead">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag-fill" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
          <strong>v0.1.3</strong> 29/03/2021
        </p>
      </div>
      <form id="form1" method="post" enctype=multipart/form-data>
        <div class="container">
          
          <h4 class="text-center">Input</h4>
          <hr class="my-4">
          <div class="row">
            <div class="col-sm">
              <p>
              Load PDB file
              </p>
              <div class="input-group mb-3">
                <input type="file" name="customFile" class="form-control" id="customFile">  
              </div>
            </div>
            <div class="col-sm">
              <p>Insert PDB ID</p>
              <div class="input-group mb-3">
                <input type="text" name="pdbid" id="pdbid" class="form-control" placeholder="PDB ID" aria-label="Example text with button addon" aria-describedby="button-addon1">
              </div>
            </div>
          </div>
          
          <h4 class="text-center">Options</h4>
          <hr class="my-4">
          <div class="row">
            <div class="col-sm">

              <p><mark>Bond Control</mark></p>
              <div class="input-group mb-3">
                <select id="bond-control" name="bond-control" class="form-select" >
                  <option selected>strict</option>
                  <option>weak</option>
                </select>
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Interaction Type</mark></p>
              <div class="input-group mb-3">
                <select id="interaction-type" name="interaction-type" class="form-select">
                  <option selected>all</option>
                  <option>multiple</option>
                  <option>one</option>
                </select>
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Network Policy</mark></p>
              <div class="input-group mb-3">
                <select id="net-policy" name="net-policy" class="form-select">
                  <option selected>closest</option>
                  <option>Ca</option>
                  <option>Cb</option>
                </select>
              </div>

            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-sm">

              <p><mark>Sequence Separation</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="seq-sep-checkbox" name="seq-sep-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="seq-sep-num" name="seq-sep-num" type="text" class="form-control" placeholder="UINT=3">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Hydrogen bond</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="h-bond-checkbox" name="h-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="h-bond-num" name="h-bond-num" type="text" class="form-control" placeholder="FLOAT=3.5" >
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Van Der Waals bond</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="vdw-bond-checkbox" name="vdw-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="vdw-bond-num" name="vdw-bond-num" type="text" class="form-control" placeholder="FLOAT=0.5">
              </div>
            </div>

          </div>
          <br>
          <div class="row">
            <div class="col-sm">

              <p><mark>Ionic bond</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="ionic-bond-checkbox" name="ionic-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="ionic-bond-num" name="ionic-bond-num" type="text" class="form-control" placeholder="FLOAT=4">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Generic bond</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                <input id="generic-bond-checkbox" name="generic-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                  </div>
                <input id="generic-bond-num" name="generic-bond-num" type="text" class="form-control" placeholder="FLOAT=6">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>&#960-cation interaction</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="pication-bond-checkbox" name="pication-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="pication-bond-num" name="pication-bond-num" type="text" class="form-control" placeholder="FLOAT=5">
              </div>

            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-sm">

              <p><mark>&#960-&#960 stacking</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="pipistack-bond-checkbox" name="pipistack-bond-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="pipistack-bond-num" name="pipistack-bond-num" type="text" class="form-control" placeholder="FLOAT=6.5">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>Hydrogen bond angle</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="h-bond-angle-checkbox" name="h-bond-angle-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="h-bond-angle-num" name="h-bond-angle-num" type="text" class="form-control" placeholder="FLOAT=63">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>&#960-cation angle</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="pication-angle-checkbox" name="pication-angle-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="pication-angle-num" name="pication-angle-num" type="text" class="form-control" placeholder="FLOAT=45">
              </div>

            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-sm">

              <p><mark>&#960-&#960 stacking-normal-normal</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="pipistack-normal-normal-checkbox" name="pipistack-normal-normal-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="pipistack-normal-normal-num" name="pipistack-normal-normal-num" type="text" class="form-control" placeholder="FLOAT=90">
              </div>

            </div>
            <div class="col-sm">

              <p><mark>&#960-&#960 stacking-normal-centre</mark></p>
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <input id="pipistack-normal-centre-checkbox" name="pipistack-normal-centre-checkbox" class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input id="pipistack-normal-centre-num" name="pipistack-normal-centre-num" type="text" class="form-control" placeholder="FLOAT=90">
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row text-center">
          <input type="hidden" id="upcontent" name="upcontent" value="">
          <div class="col-sm">
            <input type="submit" name="download" id="download" class="btn btn-primary" value="Generate XML" onclick=" if(redirectXML())load(); else return false"/>
            <div id="loading"></div>
          </div>

          <div class="col-sm">
            <input type="button" class="btn btn-primary" value="Show 2D RIN" onclick="redirect2d()"/>
          </div>
          <div class="col-sm">
            <input type="button" class="btn btn-primary" value="Show 3D RIN" onclick="redirect3d()"/>
          </div>
          <div id="result"></div>
        </div>
      </form>
      <br>
    </main>

    <br>
      <?php
        if(isset($_GET['err-send'])){
          if($_GET['err-send'] == true){
           echo '
           <div class=container>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              Insert only a .pdb file in the form.
              <button type = "button" class="btn-close" data-bs-dismiss = "alert" aria-label="Close"></button>
            </div>
          </div>
          ';
          }
        }


        if(isset($_GET['err-not-found'])){
          if($_GET['err-not-found'] == true){
           echo '
          <div class=container>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              The specified pdb file does not exist.
              <button type = "button" class="btn-close" data-bs-dismiss = "alert" aria-label="Close"></button>
            </div>
          </div>
          ';
          }
        }

        if(isset($_GET['err-int-err'])){
          if($_GET['err-int-err'] == true){
           echo '
          <div class=container>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              Internal error. The service is temporarily not working, try again later.
              <button type = "button" class="btn-close" data-bs-dismiss = "alert" aria-label="Close"></button>
            </div>
          </div>
          ';
          }
        }

        if(isset($_GET['err-bad-request'])){
          if($_GET['err-bad-request'] == true){
           echo '
           <div class=container>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              Bad Request. Error due to an incorrect value, please check that all parameters respect the constraints. For more information visit the <strong>Help</strong> page.
              <button type = "button" class="btn-close" data-bs-dismiss = "alert" aria-label="Close"></button>
            </div>
          </div>
          ';
          }
        }

        if(isset($_GET['msg-succ'])){
          if($_GET['msg-succ'] == true){
           echo '
           <div class=container>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              Completed successfully.
              <button type = "button" class="btn-close" data-bs-dismiss = "alert" aria-label="Close"></button>
            </div>
          </div>
          ';
          }
        }
      ?> 

    <br>
    <div id="loading">
    </div>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Log: <?php
                if(isset($_GET['filename'])){
                  $file = $_GET['filename'];
                  echo "<strong>".substr($file, 0, 8)."</strong>";
                }
              ?>
        </div>
        <div class="card-body">

          <pre> 
<?php
if(isset($_GET['msg-log'])){
echo $_GET['msg-log'];
}

if(isset($_GET['err-not-found'])){
echo "File not found";
}

if(isset($_GET['err-int-err'])){
echo "Internal Error";
}

if(isset($_GET['err-bad-request'])){
echo "Bad Request";
}
?>
          </pre>
          
        </div>
      </div>
    </div>
    <br>
    <?php
    if(isset($_GET['filename'])){
      $file = $_GET['filename'];
      echo "
      <div class=container>
        <a href= files/$file  download>
          <button type=button class='btn btn-primary'>Download XML</button>
        </a>
      </div>
      ";
    }
    ?>
    <br>
    <footer class="bg-light text-center text-lg-start">
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.1);">
        © 2021 Ca' Foscari University of Venice
      </div>
    </footer>
  </body>
</html>
