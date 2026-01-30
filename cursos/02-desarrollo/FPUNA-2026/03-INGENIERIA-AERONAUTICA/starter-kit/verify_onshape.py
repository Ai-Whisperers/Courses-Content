import os
from onshape_client.client import Client
from onshape_client.onshape_url import OnshapeElement
import sys

# Configuration
ACCESS_KEY = os.environ.get("ONSHAPE_ACCESS_KEY", "your_access_key_here")
SECRET_KEY = os.environ.get("ONSHAPE_SECRET_KEY", "your_secret_key_here")
BASE_URL = "https://cad.onshape.com"


def test_connection():
    print(f"Connecting to Onshape via API...")
    try:
        # Initialize Client
        client = Client(
            configuration={
                "base_url": BASE_URL,
                "access_key": ACCESS_KEY,
                "secret_key": SECRET_KEY,
            }
        )

        # 1. Test: Get Current User (Using raw request to avoid model issues)
        print("\n[1/2] Verifying Credentials...")
        # /api/users/current
        response = client.api_client.request(
            method="GET", url=f"{BASE_URL}/api/users/current", query_params={}
        )

        # The return value is a tuple (data, status, headers) or similar depending on version
        # Let's inspect it carefully. Onshape client often returns a wrapper.
        # But safest is to use the raw request if possible or standard api access.

        # If the above line didn't crash, we are authenticated at the network level.
        # Let's try parsing the response.
        if hasattr(response, "data"):
            user_data = response.data
        else:
            # Fallback if it returns a plain object
            user_data = response

        print(f"✅ Connection Established!")

        # 2. Test: Create a Test Document
        doc_name = "OpenCodeConnectionTest"
        print(f"\n[2/2] Creating Test Document '{doc_name}'...")

        # API Endpoint: POST /api/documents
        body = {"name": doc_name, "isPublic": False}

        create_resp = client.api_client.request(
            method="POST",
            url=f"{BASE_URL}/api/documents",
            headers={"Content-Type": "application/json"},
            body=body,
        )

        # Should be a JSON response
        if hasattr(create_resp, "data"):
            doc_data = create_resp.data
        else:
            doc_data = create_resp

        # Handle simplified response object or dict
        # Assuming doc_data is a dict-like or string. JSON decoding might be needed if raw.
        import json

        if isinstance(doc_data, bytes):
            doc_data = json.loads(doc_data.decode("utf-8"))
        elif hasattr(doc_data, "id"):  # It might be a model object
            doc_data = {"id": doc_data.id}

        doc_id = doc_data.get("id")
        doc_url = f"{BASE_URL}/documents/{doc_id}"

        print(f"✅ Document Created Successfully!")
        print(f"📂 ID: {doc_id}")
        print(f"🔗 URL: {doc_url}")
        print("Please refresh your Onshape Documents page now.")

    except Exception as e:
        print(f"\n❌ Script Failed: {str(e)}")
        # Print full traceback for debugging
        import traceback

        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    test_connection()
