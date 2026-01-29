from onshape_client.client import Client
import json
import time

ACCESS_KEY = "on_GPf29Gh8h91RsCl4N8Pwv"
SECRET_KEY = "tmhRrJgn2Np3hYvqYMGK2Az8TeCWu4jXWdqCh2vq90OEhzzd"
BASE_URL = "https://cad.onshape.com"

DOC_NAME = "OPENCODE_FINAL_VERIFICATION"


def run_test():
    print(f"--- Running Final Verification: {DOC_NAME} ---")
    client = Client(
        configuration={
            "base_url": BASE_URL,
            "access_key": ACCESS_KEY,
            "secret_key": SECRET_KEY,
        }
    )

    # helper to find doc
    def find_doc():
        try:
            # q=Name searches by name
            res = client.api_client.request(
                method="GET",
                url=f"{BASE_URL}/api/documents?q={DOC_NAME}",
                headers={"Content-Type": "application/json"},
            )
            data = res.data if hasattr(res, "data") else res
            if isinstance(data, bytes):
                data = json.loads(data.decode("utf-8"))

            if "items" in data:
                for item in data["items"]:
                    if item["name"] == DOC_NAME:
                        return item["id"]
            return None
        except Exception:
            return None

    # 1. Check if already exists
    print("Checking if document exists...")
    existing_id = find_doc()
    if existing_id:
        print(f"✅ Found existing document.")
        print(f"🔗 URL: {BASE_URL}/documents/{existing_id}")
        return

    # 2. Create if not found
    print("Creating PUBLIC document...")
    try:
        body = {"name": DOC_NAME, "isPublic": True}
        client.api_client.request(
            method="POST",
            url=f"{BASE_URL}/api/documents",
            headers={"Content-Type": "application/json"},
            body=body,
        )
    except Exception as e:
        # Ignore errors, as we know the client crashes on success response sometimes
        print(f"Note: Creation signal sent (Client says: {e})")
        pass

    # 3. Verify creation
    print("Verifying creation...")
    time.sleep(2)  # Wait for indexing
    new_id = find_doc()

    if new_id:
        print(f"\n✅ SUCCESS! Document Created and Visible.")
        print(f"📂 Name: {DOC_NAME}")
        print(f"🔗 URL: {BASE_URL}/documents/{new_id}")
        print("Please click the link above to view it in your browser.")
    else:
        print("❌ Could not find document after creation attempt.")
        print("Please check your 'Public' or 'Owned by me' filter in Onshape.")


if __name__ == "__main__":
    run_test()
