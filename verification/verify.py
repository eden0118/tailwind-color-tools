from playwright.sync_api import sync_playwright, expect

def verify_app(page):
    # 1. Navigate to root, verify redirect
    page.goto("http://localhost:3000/")
    expect(page).to_have_url("http://localhost:3000/code-to-class")
    print("Redirect to /code-to-class successful")

    # 2. Verify English title
    expect(page.get_by_role("heading", name="Color Converter")).to_be_visible()
    print("English title visible")

    # 3. Switch Mode
    page.get_by_role("link", name="Class to Code").click()
    expect(page).to_have_url("http://localhost:3000/class-to-code")
    print("Navigation to /class-to-code successful")

    # 4. Switch Language
    # The language switcher title is "Switch Language"
    page.get_by_title("Switch Language").click()

    # 5. Verify Chinese title
    expect(page.get_by_role("heading", name="色彩轉換器")).to_be_visible()
    print("Chinese title visible")

    # 6. Verify Chinese Mode Label
    expect(page.get_by_role("link", name="類別轉代碼")).to_be_visible()

    # 7. Screenshot
    page.screenshot(path="verification/verification.png")
    print("Screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
