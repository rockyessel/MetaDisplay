// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;



contract MetaDisplay {
    struct AssetAppreciator {
        address appreciator;
        uint256 amountAppreciated;
        uint256 appreciationQuantity;
    }
    struct AssetsDisplay {
        bytes32 _id;
        address owner;
        string title;
        string description;
        string image;
        string category;
        string date;
        uint256 amountAppreciated;
        AssetAppreciator[] appreciators;
        uint256[] appreciation;
    }
    struct User {
        address own;
    }

    // struct CollectionsDisplay {
    //     string name;
    //     string category;
    //     string created_on;
    //     uint256 total_items;
    //     address[] owners;
    //     _id[] assets;
    // }

    mapping(uint256 => AssetsDisplay) public assets_display;
    uint256 public no_of_assets = 0;

    function createAssetDisplay(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _category,
        string memory _date
    ) public payable returns (uint256) {
        bytes32 _id = keccak256(
            abi.encodePacked(msg.sender, block.number, block.timestamp)
        );

        AssetsDisplay storage asset_display = assets_display[no_of_assets];

        asset_display._id = _id;
        asset_display.owner = _owner;
        asset_display.title = _title;
        asset_display.description = _description;
        asset_display.image = _image;
        asset_display.category = _category;
        asset_display.date = _date;
        asset_display.amountAppreciated = 0;

        no_of_assets++;

        return no_of_assets - 1;
    }

function appreciateAsset(address payable _receiver, bytes32 _id) public payable {
    uint256 id = uint256(_id);
    AssetsDisplay storage asset_display = assets_display[id];

    AssetAppreciator memory appreciator;
    bool found = false;
    for (uint256 i = 0; i < asset_display.appreciators.length; i++) {
        if (asset_display.appreciators[i].appreciator == msg.sender) {
            appreciator = asset_display.appreciators[i];
            appreciator.amountAppreciated += msg.value;
            appreciator.appreciationQuantity += 1;
            asset_display.appreciators[i] = appreciator;
            found = true;
            break;
        }
    }

    if (!found) {
        appreciator = AssetAppreciator(
            msg.sender,
            msg.value,
            1
        );
        asset_display.appreciators.push(appreciator);
    }

    asset_display.amountAppreciated += msg.value;

    (bool sent, ) = _receiver.call{value: msg.value}("");
    require(sent, "Ether transfer to asset owner failed.");
}

    function getAppreciators(
        uint256 _id
    ) public view returns (AssetAppreciator[] memory) {
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

    function getAssetDisplay(
        bytes32 _id
    ) public view returns (AssetsDisplay memory) {
        uint256 id = uint256(_id);
        return assets_display[id];
    }

   function sendNativeToken(address payable recipient) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(msg.sender.balance >= msg.value, "Insufficient balance");

        recipient.transfer(msg.value);
    }
}
