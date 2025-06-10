import requests
from bs4 import BeautifulSoup
import json
import os
import re
from datetime import datetime

def scrape_ign():
    url = "https://www.ign.com/news"  # IGN news section
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'}
    
    print(f"Scraping URL: {url}")
    try:
        response = requests.get(url, headers=headers)
        print(f"Response Status Code: {response.status_code}")
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            
            # Updated selector based on current IGN structure
            articles = soup.select('div.content-item')
            if not articles:
                articles = soup.select('a.ArticleLink')  # Fallback to old structure
            
            print(f"Found {len(articles)} articles")
            news = []

            for article in articles[:10]:  # Limit to 10 articles
                # Try different selectors for title
                title_element = article.select_one('h3') or article.select_one('span.content-title') or article
                title = title_element.get_text(strip=True)
                
                # Try to find the link
                if article.name == 'a':
                    link = article['href']
                else:
                    link_element = article.find('a')
                    link = link_element['href'] if link_element else None
                
                if link and not link.startswith("http"):
                    link = "https://www.ign.com" + link
                
                if title and link:
                    news.append({"title": title, "url": link})
                    print(f"Added: {title[:50]}... - {link}")

            return news
        else:
            print(f"Failed to fetch page: Status code {response.status_code}")
            return []
            
    except Exception as e:
        print(f"Error scraping IGN: {str(e)}")
        return []

def save_to_json(data, filename=None):
    """Save the scraped data to a JSON file"""
    # Create data directory if it doesn't exist
    os.makedirs("data", exist_ok=True)
    
    if filename is None:
        # Get current timestamp for the data
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Find the next available sequence number
        existing_files = os.listdir("data")
        max_seq = 0
        
        # Extract sequence numbers from existing files
        pattern = re.compile(r'ign_news_(\d+)_\d{8}_\d{6}\.json')
        for file in existing_files:
            match = pattern.match(file)
            if match:
                seq = int(match.group(1))
                max_seq = max(max_seq, seq)
        
        # Create new filename with incremented sequence number
        next_seq = max_seq + 1
        filename = f"ign_news_{next_seq:03d}_{timestamp}.json"
    
    filepath = os.path.join("data", filename)
    
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Data successfully saved to {filepath}")
        return filepath
    except Exception as e:
        print(f"Error saving data to JSON: {str(e)}")
        return None

if __name__ == "__main__":
    print("Starting IGN scraper...")
    results = scrape_ign()
    
    if results:
        # Save results to JSON file
        json_file = save_to_json(results)
        
        # Print results to console
        print(f"\nResults: {len(results)} articles scraped from IGN")
        if json_file:
            print(f"Data saved to: {json_file}")
            
        print("\nArticles:")
        for i, item in enumerate(results, 1):
            print(f"{i}. {item['title']}")
            print(f"   URL: {item['url']}")
            print("")
    else:
        print("No results found.")
