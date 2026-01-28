from onshape_client.client import Client
import json

ACCESS_KEY = "on_GPf29Gh8h91RsCl4N8Pwv"
SECRET_KEY = "tmhRrJgn2Np3hYvqYMGK2Az8TeCWu4jXWdqCh2vq90OEhzzd"
BASE_URL = "https://cad.onshape.com"


def list_stuff():
    print("--- Listing Your Onshape Documents ---")
    client = Client(
        configuration={
            "base_url": BASE_URL,
            "access_key": ACCESS_KEY,
            "secret_key": SECRET_KEY,
        }
    )

    try:
        # Get recent docs
        res = client.api_client.request(
            method="GET",
            url=f"{BASE_URL}/api/documents",  # default filter might be recent
            query_params={"sort": "createdAt", "sortOrder": "desc", "limit": 10},
        )

        data = res.data if hasattr(res, "data") else res
        if isinstance(data, bytes):
            data = json.loads(data.decode("utf-8"))

        if "items" in data:
            print(f"Found {len(data['items'])} documents:")
            found_any = False
            for doc in data["items"]:
                print(f" 📄 Name: {doc['name']}")
                print(f"    ID: {doc['id']}")
                print(f"    Public: {doc.get('isPublic', 'Unknown')}")
                print(f"    Link: {BASE_URL}/documents/{doc['id']}")
                print("-" * 30)
                found_any = True

            if not found_any:
                print("No documents found in recent list.")
        else:
            print(f"API returned structure without items: {data.keys()}")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    list_stuff()
