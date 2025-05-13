// Sample articles
const posts = [
    {
      title: "Moog Matriarch Review",
      category: "Synths",
      tags: ["analog", "semi-modular", "Moog"],
      body: "The Moog Matriarch is a semi-modular analog synthesizer...",
    },
    {
      title: "Ableton Live Review",
      category: "Software",
      tags: ["DAW", "Ableton"],
      body: "Ableton Live is one of the most popular DAWs for musicians...",
    },
    // Add more posts here...
  ];
  
  // Filter Posts by Category
  const filterSelect = document.getElementById('category');
  const contentSection = document.getElementById('content');
  
  filterSelect.addEventListener('change', function () {
    const selectedCategory = filterSelect.value;
    const filteredPosts = posts.filter(post => 
      selectedCategory === 'all' || post.category === selectedCategory
    );
    displayPosts(filteredPosts);
  });
  
  // Display Posts
  function displayPosts(posts) {
    contentSection.innerHTML = ''; // Clear previous posts
    posts.forEach(post => {
      const article = document.createElement('article');
      article.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Category:</strong> ${post.category}</p>
        <p>${post.body.substring(0, 150)}...</p>
      `;
      contentSection.appendChild(article);
    });
  }
  
  // Initial Load
  displayPosts(posts);
  