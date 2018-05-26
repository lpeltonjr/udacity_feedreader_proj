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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('and each has a URL', function() {
			allFeeds.forEach((item)=>{
				expect(item.url).toBeDefined();
				expect(item.url.length).not.toBe(0);
			});
		});

        /* Write a test that loops through each feed
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


    /* Write a new test suite named "The menu" */
	describe('The menu', function() {
		
	
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it('is hidden by default', function() {
			expect(document.body.classList.contains('menu-hidden')).toBe(true);
		});

         /* Write a test that ensures the menu changes
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
			expect(document.body.classList.contains('menu-hidden')).toBe(false);
				
			//	close the menu with another synthesized click
			x.dispatchEvent(y);
			expect(document.body.classList.contains('menu-hidden')).toBe(true);
		});
	});

    /* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		/* Write a test that ensures when the loadFeed
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

    /* Write a new test suite named "New Feed Selection" */

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
	describe('New Feed Selection', function() {
		
		//	create variable for storing string containing all feed text after loading feed the
		//	FIRST time
		let prevStr;
				
		beforeEach(function(done) {
			
			//	load the feed once; when it's loaded, store the feed text in prevStr for comparison
			//	later, then load the feed again from a different source and tell Jasmine when that's done
			loadFeed(2, ()=>{
				prevStr = document.querySelector(".feed").innerText;
//				console.log(prevStr);
				
				loadFeed(0, ()=>done());
			});
		});

		it('changes when the new feed is loaded', function() {
//			console.log(document.querySelector(".feed").innerText);
		
			//	the feed text should have changed from the previous state; ensure it has
			expect(document.querySelector(".feed").innerText).not.toBe(prevStr);
		});
		
	});
}());
