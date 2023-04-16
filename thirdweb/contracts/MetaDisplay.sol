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
        string _id;
        uint256 amountAppreciated;
        uint16 appreciationQuantity;
    }

    struct Assets {
        string _id;
        address owner;
        string title;
        string description;
        string image;
        string category;
        string date;
        Appreciator[] appreciators;
    }

    mapping(bytes32 => mapping(address => uint256))
        public assetAppreciatorIndex;
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
        string memory _id,
        string memory _title,
        string memory _description,
        string memory _image,
        string memory _category,
        string memory _date
    ) public {
        bytes32 assetId = keccak256(abi.encodePacked(no_of_assets));
        Assets memory newAsset = Assets({
            _id: _id,
            owner: msg.sender,
            title: _title,
            description: _description,
            image: _image,
            category: _category,
            date: _date,
            appreciators: new Appreciator[](0)
        });

        assets_display[assetId] = newAsset;
        no_of_assets++;
    }

    // function getAllAssets() public view returns (Assets[] memory) {
    //     Assets[] memory allAssets = new Assets[](no_of_assets);

    //     for (uint256 i = 0; i < no_of_assets; i++) {
    //         Assets storage asset = assets_display[i];

    //         allAssets[i] = asset;
    //     }

    //     return allAssets;
    // }

    function getAllAssets() public view returns (Assets[] memory) {
        Assets[] memory allAssets = new Assets[](no_of_assets);

        for (uint256 i = 0; i < no_of_assets; i++) {
            Assets storage asset = assets_display[i];

            allAssets[i] = Assets({
                _id: asset._id,
                owner: asset.owner,
                title: asset.title,
                description: asset.description,
                image: asset.image,
                category: asset.category,
                date: asset.date,
                appreciators: asset.appreciators
            });
        }

        return allAssets;
    }

    // function getAsset(bytes32 _id) public view returns (Assets memory) {
    //     uint256 id = uint256(_id);
    //     require(id < no_of_assets, "Asset with the given ID does not exist.");
    //     return assets_display[id];
    // }

    function getAssetById(
        string memory _id
    ) public view returns (Assets memory) {
        // Loop through all assets to find the one with the given _id
        for (uint256 i = 0; i < no_of_assets; i++) {
            Assets storage asset = assets_display[i];
            if (keccak256(bytes(asset._id)) == keccak256(bytes(_id))) {
                // Return the asset if the _id matches
                return
                    Assets({
                        _id: asset._id,
                        owner: asset.owner,
                        title: asset.title,
                        description: asset.description,
                        image: asset.image,
                        category: asset.category,
                        date: asset.date,
                        appreciators: asset.appreciators
                    });
            }
        }
        // If no asset with the given _id is found, return an empty struct
        return
            Assets({
                _id: "",
                owner: address(0),
                title: "",
                description: "",
                image: "",
                category: "",
                date: "",
                appreciators: new Appreciator[](0)
            });
    }

    function appreciateAsset(
        address payable _receiver,
        string memory _assetId
    ) public payable {
        bytes32 assetId = keccak256(abi.encodePacked(_assetId));
        Assets storage asset = assets_display[assetId];

        uint256 index = assetAppreciatorIndex[assetId][msg.sender];
        if (index == 0) {
            Appreciator memory newAppreciator = Appreciator(
                msg.sender,
                _assetId,
                msg.value,
                1
            );
            asset.appreciators.push(newAppreciator);
            assetAppreciatorIndex[assetId][msg.sender] = asset
                .appreciators
                .length;
        } else {
            asset.appreciators[index - 1].amountAppreciated += msg.value;
            asset.appreciators[index - 1].appreciationQuantity++;
        }

        (bool sent, ) = _receiver.call{value: msg.value}("");
        require(sent, "Ether transfer to asset owner failed.");
    }

    function getAppreciators(
        string memory _id
    ) public view returns (Appreciator[] memory) {
        bytes32 assetId = keccak256(abi.encodePacked(_id));
        return assets_display[uint256(assetId)].appreciators;
    }
}
