// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaDisplay {
     struct AssetsDisplay {
        address owner;
        string title;
        string description;
        string image;
        string category;
        string dates;
        uint256 target;
        uint256 amountApprecated;
        address[] appreciators;
        uint256[] apprecation;
    }

    struct User {
        string name;
        string image;
        string email;
        string username;
        string description;
        address ethereumAddress;
    }


    mapping(address => User) public users;
    mapping(uint256 => AssetsDisplay) public assets_display;

    uint256 public no_of_assets = 0;


    function createUser(string memory _name, string memory _image, string memory _email, string memory _username, string memory _description) public {
    // Create a new User struct and populate it with the user's information
    User storage user = users[msg.sender];


    user.name = _name;
    user.image = _image;
    user.email = _email;
    user.username = _username;
    user.description = _description;
    user.ethereumAddress = msg.sender;
}

    function createAssetDisplay(address _user, string memory _title, string memory _description, string memory _image, string memory _category,
    string memory _dates, uint256 _target) public returns (uint256) {
        AssetsDisplay storage asset_display = assets_display[no_of_assets];


        asset_display.owner = _user;
        asset_display.title = _title;
        asset_display.description = _description;
        asset_display.image = _image;
        asset_display.category = _category;
        asset_display.dates = _dates;
        asset_display.target = _target;
        asset_display.amountApprecated = 0;

        no_of_assets++;

        return no_of_assets - 1;
    }


    
    function apprecateAsset(uint256 _id) public payable {
        uint256 amount  = msg.value;

        AssetsDisplay storage  asset_display = assets_display[_id];

        asset_display.appreciators.push(msg.sender);
        asset_display.apprecation.push(amount);

        (bool sent, ) = payable(asset_display.owner).call{value: amount}("");

        if(sent) {
            asset_display.amountApprecated = asset_display.amountApprecated + amount;
        }
    }
}