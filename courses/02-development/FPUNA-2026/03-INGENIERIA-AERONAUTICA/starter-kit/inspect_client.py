from onshape_client.client import Client

ACCESS_KEY = "on_GPf29Gh8h91RsCl4N8Pwv"
SECRET_KEY = "tmhRrJgn2Np3hYvqYMGK2Az8TeCWu4jXWdqCh2vq90OEhzzd"
BASE_URL = "https://cad.onshape.com"

try:
    print("Init client...")
    client = Client(
        configuration={
            "base_url": BASE_URL,
            "access_key": ACCESS_KEY,
            "secret_key": SECRET_KEY,
        }
    )
    print("Client attributes:")
    for d in dir(client):
        if not d.startswith("_"):
            print(f" - {d}")

    # Try to see if api_client exists
    if hasattr(client, "api_client"):
        print("\napi_client attributes:")
        for d in dir(client.api_client):
            if not d.startswith("_"):
                print(f" - {d}")

except Exception as e:
    print(f"Error: {e}")
