// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaDisplay {
    struct Appreciator {
        address ethereumAddress;
        string username;
        string name;
        string email;
        string image;
        uint256 amountAppreciated;
        uint256 numAppreciations;
    }

    struct AssetsDisplay {
        address owner;
        string title;
        string description;
        string image;
        string category;
        string dates;
        uint256 target;
        uint256 amountAppreciated;
        Appreciator[] appreciators;
        uint256[] apprecation;
    }

    struct User {
        string name;
        string image;
        string email;
        string username;
        string description;
        address _address;
    }

    mapping(uint256 => User) public users;
    mapping(uint256 => AssetsDisplay) public assets_display;

    uint256 public no_of_assets = 0;
    uint256 public no_of_users = 0;

    function createUser(
        string memory _name,
        string memory _image,
        string memory _email,
        string memory _username,
        string memory _description
    ) public returns (uint256) {
        User storage user = users[no_of_users];

        user.name = _name;
        user.image = _image;
        user.email = _email;
        user.username = _username;
        user.description = _description;
        user._address = msg.sender;

        uint256 index = no_of_users++;
        return index - 1;
    }

    function createAssetDisplay(
        address _user,
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _category,
        string memory _dates,
        uint256 _target
    ) public returns (uint256) {
        AssetsDisplay storage asset_display = assets_display[no_of_assets];

        asset_display.owner = _user;
        asset_display.title = _title;
        asset_display.description = _description;
        asset_display.image = _image;
        asset_display.category = _category;
        asset_display.dates = _dates;
        asset_display.target = _target;
        asset_display.amountAppreciated = 0;

        no_of_assets++;

        return no_of_assets - 1;
    }

    function appreciateAsset(
        uint256 _id,
        string memory _username,
        string memory _name,
        string memory _email,
        string memory _image
    ) public payable {
        uint256 amount = msg.value;

        AssetsDisplay storage asset_display = assets_display[_id];

        Appreciator memory appreciator = Appreciator(
            msg.sender,
            _username,
            _name,
            _email,
            _image,
            amount,
            1
        );

        bool found = false;
        uint256 i;
        for (i = 0; i < asset_display.appreciators.length; i++) {
            if (asset_display.appreciators[i].ethereumAddress == msg.sender) {
                appreciator.amountAppreciated += asset_display.apprecation[i];
                appreciator.numAppreciations += asset_display
                    .appreciators[i]
                    .numAppreciations;
                asset_display.appreciators[i] = appreciator;
                found = true;
                break;
            }
        }

        if (!found) {
            i = asset_display.appreciators.length;
            asset_display.appreciators.push(appreciator);
        }

        asset_display.apprecation.push(amount);

        (bool sent, ) = payable(asset_display.owner).call{value: amount}("");

        if (sent) {
            asset_display.amountAppreciated += amount;
        }
    }

    function getAppreciators(
        uint256 _id
    ) public view returns (Appreciator[] memory) {
        return assets_display[_id].appreciators;
    }

    function getAssetsDisplay() public view returns (AssetsDisplay[] memory) {
        AssetsDisplay[] memory allAssetsDisplay = new AssetsDisplay[](
            no_of_assets
        );

        for (uint256 i = 0; i < no_of_assets; i++) {
            AssetsDisplay storage asset = assets_display[i];

            allAssetsDisplay[i] = asset;
        }

        return allAssetsDisplay;
    }

    function getUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](no_of_users);

        for (uint256 i = 0; i < no_of_users; i++) {
            User storage user = users[i];

            allUsers[i] = user;
        }

        return allUsers;
    }
}
