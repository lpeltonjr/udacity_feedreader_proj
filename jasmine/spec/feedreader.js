/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('and each has a URL', function() {
			allFeeds.forEach((item)=>{
				expect(item.url).toBeDefined();
				expect(item.url.length).not.toBe(0);
			});
		});

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('and each is named', function() {
			allFeeds.forEach((item)=>{
				expect(item.name).toBeDefined();
				expect(item.name.length).not.toBe(0);
			});
			 
		 });
    });


    /* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
		
	
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it('is hidden by default', function() {
			expect(document.body.className).toBe('menu-hidden');
		});

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('changes when the menu icon is clicked', function() {

			//	grab the menu icon and create a new click event
			let x = document.querySelector(".menu-icon-link");
			let y = new Event("click");
				
			//	open the menu by synthesizing a click over it
			x.dispatchEvent(y);
			expect(document.body.className).toBe('');
				
			//	close the menu with another synthesized click
			x.dispatchEvent(y);
			expect(document.body.className).toBe('menu-hidden');
		});
	});

    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		/* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done) {
			loadFeed(0, ()=>done());
		});
		
		//	assume that if there's a single .entry element, we can fetch a
		//	DOM reference to it that will test as true; and thus if there's no
		//	.entry element, our reference will test false
		it('are loaded correctly', function() {
			
			expect(document.querySelector("article.entry")).toBeTruthy();
		});
	});

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
	describe('New Feed Selection', function() {
		
		//	store current text in the feed
		prevStr = document.querySelector(".feed").innerText;
				
		beforeEach(function(done) {

			//	was going to do it by synthetically clicking the menu, but can't make the asynchronous part
			//	work in Jasmine doing it that way, so I'm calling loadFeed directly;
			//	a synthetic click would be a better test
//			$("[data-id=3]").trigger("click");			

			loadFeed(2, ()=>done());
		});

		it('changes when the new feed is loaded', function() {
			
			//	the feed text should have changed from the previous state; ensure it has
			expect(document.querySelector(".feed").innerText).not.toBe(prevStr);

			//	set the feed back to the first menu item;
			//	I tried for hours doing this with straight DOM and JavaScript, without success; I had to
			//	figure out how to do it with JQuery by looking at the JQuery API and StackOverflow; I still don't
			//	know what the JQuery code in "feedList.on ..." did that keeps dispatchEvent() from working;
			//	JQuery is de-emphasized in the earlier Udacity course material, so I've not bothered to learn it
			$("[data-id=0]").trigger("click");			
		});
		
	});
}());
