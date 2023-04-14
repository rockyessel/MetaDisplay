// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaDisplay {
    struct Collections {
        bytes32 _id;
        address owner;
        string profile;
        string cover;
        string title;
        string description;
        string date;
        string category;
        bytes32[] assetId;
    }

    struct Appreciator {
        address appreciator;
        bytes32 assetId;
        uint256 amountAppreciated;
        uint16 appreciationQuantity;
    }

    struct Assets {
        bytes32 _id;
        address owner;
        string title;
        string description;
        string image;
        string category;
        string date;
        uint256 amountAppreciated;
        Appreciator[] appreciators;
    }

    mapping(uint256 => Assets) public assets_display;
    mapping(uint256 => Collections) public collections;
    uint256 public no_of_assets = 0;
    uint256 public no_of_appreciators = 0;
    uint256 public no_of_collections = 0;

    event CollectionCreated(
        bytes32 indexed collectionId,
        address indexed owner,
        string title
    );

    event AssetAdded(bytes32 indexed collectionId, bytes32 indexed assetId);

    function createCollection(
        address _owner,
        string memory _profile,
        string memory _cover,
        string memory _title,
        string memory _description,
        string memory _date,
        string memory _category
    ) public payable {
        // Generate a unique ID for the collection
        bytes32 collectionId = keccak256(
            abi.encodePacked(msg.sender, block.number, block.timestamp)
        );

        // Create the collection object
        Collections memory collection = Collections({
            _id: collectionId,
            owner: _owner,
            profile: _profile,
            cover: _cover,
            title: _title,
            description: _description,
            date: _date,
            category: _category,
            assetId: new bytes32[](0)
        });

        // Add the collection to the global collections mapping
        collections[uint256(collectionId)] = collection;

        no_of_collections++;

        // Emit a CollectionCreated event
        emit CollectionCreated(collectionId, _owner, _title);
    }

    function addAssetToCollection(
        bytes32 _collectionId,
        bytes32 _assetId
    ) public {
        // Get the collection from the global collections mapping
        Collections storage collection = collections[uint256(_collectionId)];

        // Add the asset ID to the collection's assetId array
        collection.assetId.push(_assetId);

        // Emit an AssetAdded event
        emit AssetAdded(_collectionId, _assetId);
    }

    function getAllCollections() public view returns (Collections[] memory) {
        Collections[] memory allCollections = new Collections[](
            no_of_collections
        );
        for (uint256 i = 0; i < no_of_collections; i++) {
            allCollections[i] = collections[i];
        }
        return allCollections;
    }

    function getCollection(
        bytes32 _collectionId
    ) public view returns (Collections memory) {
        return collections[uint256(_collectionId)];
    }

    function createAsset(
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

        Assets storage asset_display = assets_display[no_of_assets];

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

    function getAllAssets() public view returns (Assets[] memory) {
        Assets[] memory allAssets = new Assets[](no_of_assets);

        for (uint256 i = 0; i < no_of_assets; i++) {
            Assets storage asset = assets_display[i];

            allAssets[i] = asset;
        }

        return allAssets;
    }

    function getAsset(bytes32 _id) public view returns (Assets memory) {
        uint256 id = uint256(_id);
        require(id < no_of_assets, "Asset with the given ID does not exist.");
        return assets_display[id];
    }

    function appreciateAsset(
        address payable _receiver,
        bytes32 _id
    ) public payable {
        uint256 id = uint256(_id);
        Assets storage asset_display = assets_display[id];

        bool found = false;
        for (uint256 i = 0; i < asset_display.appreciators.length; i++) {
            if (asset_display.appreciators[i].appreciator == msg.sender) {
                asset_display.appreciators[i].amountAppreciated += msg.value;
                asset_display.appreciators[i].appreciationQuantity++;
                found = true;
                break;
            }
        }

        if (!found) {
            Appreciator storage newAppreciator = asset_display
                .appreciators
                .push();
            newAppreciator.appreciator = msg.sender;
            newAppreciator.assetId = _id;
            newAppreciator.amountAppreciated = msg.value;
            newAppreciator.appreciationQuantity = 1;
            no_of_appreciators++;
        }

        asset_display.amountAppreciated += msg.value;

        (bool sent, ) = _receiver.call{value: msg.value}("");
        require(sent, "Ether transfer to asset owner failed.");
    }

    function getAppreciators(
        uint256 _id
    ) public view returns (Appreciator[] memory) {
        return assets_display[_id].appreciators;
    }
}
