function App() {
  return (
    <div id="container">

      <header id="site-header">

        <nav class="navbar">
          <section class="navbar-dashboard">
            <a href="#">Dashboard</a>

            <div id="guest">
              <a class="button" href="#">Login</a>
              <a class="button" href="#">Register</a>
            </div>

            <div id="user">
              <span>Welcome, email</span>
              <a class="button" href="#">My Pets</a>
              <a class="button" href="#">Add Pet</a>
              <a class="button" href="#">Logout</a>
            </div>
          </section>
        </nav>
      </header>


      <main id="site-content"></main>


      <section id="login-page" class="login">
        <form id="login-form" action="" method="">
          <fieldset>
            <legend>Login Form</legend>
            <p class="field">
              <label htmlFor="email">Email</label>
              <span class="input">
                <input type="text" name="email" id="email" placeholder="Email" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="password">Password</label>
              <span class="input">
                <input type="password" name="password" id="password" placeholder="Password" />
              </span>
            </p>
            <input class="button submit" type="submit" value="Login" />
          </fieldset>
        </form>
      </section>


      <section id="register-page" class="register">
        <form id="register-form" action="" method="">
          <fieldset>
            <legend>Register Form</legend>
            <p class="field">
              <label htmlFor="email">Email</label>
              <span class="input">
                <input type="text" name="email" id="email" placeholder="Email" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="password">Password</label>
              <span class="input">
                <input type="password" name="password" id="password" placeholder="Password" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="repeat-pass">Repeat Password</label>
              <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password" />
              </span>
            </p>
            <input class="button submit" type="submit" value="Register" />
          </fieldset>
        </form>
      </section>


      <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>

        <ul class="other-pets-list">
          <li class="otherPet">
            <h3>Name: Buddy</h3>
            <p>Type: dog</p>
            <p class="img"><img src="/images/dog2.png" /></p>
            <a class="button" href="#">Details</a>
          </li>

          <li class="otherPet">
            <h3>Name: Tyson</h3>
            <p>Type: parrot</p>
            <p class="img"><img src="/images/parrot.png" /></p>
            <a class="button" href="#">Details</a>
          </li>

          <li class="otherPet">
            <h3>Name: Milo</h3>
            <p>Type: dog</p>
            <p class="img"><img src="/images/dog.png" /></p>
            <a class="button" href="#">Details</a>
          </li>

          <li class="otherPet">
            <h3>Name: Tom</h3>
            <p>Type: cat</p>
            <p class="img"><img src="/images/cat1.png" /></p>
            <a class="button" href="#">Details</a>
          </li>
        </ul>

        <p class="no-pets">No pets in database!</p>
      </section>


      <section id="details-page" class="details">
        <div class="pet-information">
          <h3>Name: Milo</h3>
          <p class="type">Type: dog</p>
          <p class="img"><img src="/images/dog.png" /></p>
          <div class="actions">

            <a class="button" href="#">Edit</a>
            <a class="button" href="#">Delete</a>

            <a class="button" href="#">Like</a>

            <div class="likes">
              <img class="hearts" src="/images/heart.png" />
              <span id="total-likes">Likes: 0</span>
            </div>

          </div>
        </div>
        <div class="pet-description">
          <h3>Description:</h3>
          <p>Today, some dogs are used as pets, others are used to help humans do their work. They are a popular
            pet because they are usually playful, friendly, loyal and listen to humans. Thirty million dogs in
            the United States are registered as pets.[5] Dogs eat both meat and vegetables, often mixed together
            and sold in stores as dog food. Dogs often have jobs, including as police dogs, army dogs,
            assistance dogs, fire dogs, messenger dogs, hunting dogs, herding dogs, or rescue dogs.</p>
        </div>
      </section>

      <section id="create-page" class="create">
        <form id="create-form" action="" method="">
          <fieldset>
            <legend>Add new Pet</legend>
            <p class="field">
              <label htmlFor="name">Name</label>
              <span class="input">
                <input type="text" name="name" id="name" placeholder="Name" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="description">Description</label>
              <span class="input">
                <textarea name="description" id="description" placeholder="Description"></textarea>
              </span>
            </p>
            <p class="field">
              <label htmlFor="image">Image</label>
              <span class="input">
                <input type="text" name="imageUrl" id="image" placeholder="Image" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="type">Type</label>
              <span class="input">
                <select id="type" name="type">
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="parrot">Parrot</option>
                  <option value="reptile">Reptile</option>
                  <option value="other">Other</option>
                </select>
              </span>
            </p>
            <input class="button submit" type="submit" value="Add Pet" />
          </fieldset>
        </form>
      </section>

      <section id="edit-page" class="edit">
        <form id="edit-form" action="#" method="">
          <fieldset>
            <legend>Edit my Pet</legend>
            <p class="field">
              <label htmlFor="name">Name</label>
              <span class="input">
                <input type="text" name="name" id="name" value="Milo" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="description">Description</label>
              <span class="input">
                <textarea name="description"
                  id="description">Today, some dogs are used as pets, others are used to help humans do their work. They are a popular pet because they are usually playful, friendly, loyal and listen to humans. Thirty million dogs in the United States are registered as pets.[5] Dogs eat both meat and vegetables, often mixed together and sold in stores as dog food. Dogs often have jobs, including as police dogs, army dogs, assistance dogs, fire dogs, messenger dogs, hunting dogs, herding dogs, or rescue dogs.</textarea>
              </span>
            </p>
            <p class="field">
              <label htmlFor="image">Image</label>
              <span class="input">
                <input type="text" name="imageUrl" id="image" value="/images/dog.png" />
              </span>
            </p>
            <p class="field">
              <label htmlFor="type">Type</label>
              <span class="input">
                <select id="type" name="type" value="dog">
                  <option value="cat" >Cat</option>
                  <option value="dog" selected>Dog</option>
                  <option value="parrot">Parrot</option>
                  <option value="reptile">Reptile</option>
                  <option value="other">Other</option>
                </select>
              </span>
            </p>
            <input class="button submit" type="submit" value="Save" />
          </fieldset>
        </form>
      </section>


      <section id="my-pets-page" class="my-pets">
        <h1>My Pets</h1>

        <ul class="my-pets-list">
          <li class="otherPet">
            <h3>Name: Milo</h3>
            <p>Type: dog</p>
            <p class="img"><img src="/images/dog.png" /></p>
            <a class="button" href="#">Details</a>
          </li>
          <li class="otherPet">
            <h3>Name: Tom</h3>
            <p>Type: cat</p>
            <p class="img"><img src="/images/cat1.png" /></p>
            <a class="button" href="#">Details</a>
          </li>
        </ul>


        <p class="no-pets">No pets in database!</p>
      </section>

      <footer id="site-footer">
        <p>@PetMyPet</p>
      </footer>

    </div>
  );
}

export default App;
