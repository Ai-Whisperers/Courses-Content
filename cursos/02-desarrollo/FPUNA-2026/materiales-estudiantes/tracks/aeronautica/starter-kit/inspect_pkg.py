import onshape_client
import os

print(f"Location: {onshape_client.__file__}")
print(f"Dir: {dir(onshape_client)}")

# List submodules
pkg_path = os.path.dirname(onshape_client.__file__)
for item in os.listdir(pkg_path):
    print(f" - {item}")
