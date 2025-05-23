// Replace this with the path to your GitHub repository
const REPO_OWNER = 'westonwellman'; // Replace with your GitHub username
const REPO_NAME = 'audio-review-site'; // Replace with your repository name
const API_URL = `https://api.github.com/repos/westonwellman/audio-review-site/contents/src/content/posts`;

// Get posts from GitHub and display them
async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Filter out only markdown files
    const posts = data.filter(file => file.name.endsWith('.md'));
    
    // Fetch each post's content
    const postPromises = posts.map(async (post) => {
      const postResponse = await fetch(post.download_url);
      const postData = await postResponse.text();
      
      // Convert Markdown to HTML
      const htmlContent = marked(postData);

      return {
        title: post.name.replace('.md', '').replace(/-/g, ' '),
        body: htmlContent
      };
    });

    const postDetails = await Promise.all(postPromises);
    displayPosts(postDetails);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Display posts in the content section
function displayPosts(posts) {
  const contentSection = document.getElementById('content');
  contentSection.innerHTML = ''; // Clear previous posts

  posts.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <div>${post.body}</div>
    `;
    contentSection.appendChild(article);
  });
}

// Load posts when the page loads
fetchPosts();




function displayPosts(posts) {
  const contentSection = document.getElementById('content');
  contentSection.innerHTML = ''; // Clear previous posts

  posts.forEach(post => {
    const article = document.createElement('article');

    // You can extract category and tags from your front matter here (assuming you have them in your markdown)
    const category = post.category || 'Uncategorized';
    const tags = post.tags || [];

    const tagsHtml = tags.map(tag => `<span class="post-tag">${tag}</span>`).join(', ');

    article.innerHTML = `
      <h2>${post.title}</h2>
      <div class="post-meta">
        <span class="post-category">Category: ${category}</span>
        <span class="post-tags">Tags: ${tagsHtml}</span>
      </div>
      <div>${post.body}</div>
    `;
    contentSection.appendChild(article);
  });
}
