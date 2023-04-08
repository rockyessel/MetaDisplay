// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaDisplay {
    struct AssetAppreciator {
        address appreciator;
        uint256 amountAppreciated;
        uint256 appreciationQuantity;
    }
    struct AssetsDisplay {
        address owner;
        string title;
        string description;
        string image;
        string category;
        string dates;
        uint256 amountAppreciated;
        AssetAppreciator[] appreciators;
        uint256[] apprecation;
    }
    struct User {
        address own;
    }

    // struct CollectionsDisplay {
    //     string name;
    //     string category;
    //     string created_on;
    //     uint256 total_items;
    //     User[] owners;
    //     AssetsDisplay[] assets;
    // }

    mapping(uint256 => AssetsDisplay) public assets_display;
    uint256 public no_of_assets = 0;

    function createAssetDisplay(
        address _user,
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _category,
        string memory _dates
    ) public returns (uint256) {
        AssetsDisplay storage asset_display = assets_display[no_of_assets];

        asset_display.owner = _user;
        asset_display.title = _title;
        asset_display.description = _description;
        asset_display.image = _image;
        asset_display.category = _category;
        asset_display.dates = _dates;
        asset_display.amountAppreciated = 0;

        no_of_assets++;

        return no_of_assets - 1;
    }

    function appreciateAsset(uint256 _id) public payable {
        uint256 amount = msg.value;

        AssetsDisplay storage asset_display = assets_display[_id];

        AssetAppreciator memory appreciator = AssetAppreciator(
            msg.sender,
            amount,
            1
        );

        bool found = false;
        uint256 i;
        for (i = 0; i < asset_display.appreciators.length; i++) {
            if (asset_display.appreciators[i].appreciator == msg.sender) {
                appreciator.amountAppreciated += asset_display.apprecation[i];
                appreciator.appreciationQuantity += asset_display
                    .appreciators[i]
                    .appreciationQuantity;
                asset_display.appreciators[i] = appreciator;
                found = true;
                break;
            }
        }

        if (!found) {
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
}
