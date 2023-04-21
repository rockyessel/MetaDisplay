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
        string[] assetId;
    }

    struct Appreciator {
        address appreciator;
        string assetId;
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
    mapping(bytes32 => Assets) public assets_display;
    mapping(uint256 => Collections) public collections;
    uint256 public no_of_assets = 0;
    uint256 public no_of_appreciators = 0;
    uint256 public no_of_collections = 0;
    bytes32[] public assetIds;

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
            assetId: new string[](0)
        });

        // Add the collection to the global collections mapping
        collections[uint256(collectionId)] = collection;

        no_of_collections++;

        // Emit a CollectionCreated event
        emit CollectionCreated(collectionId, _owner, _title);
    }

    function addAssetToCollection(
        bytes32 _collectionId,
        string memory _assetId
    ) public {
        // Get the collection from the global collections mapping
        Collections storage collection = collections[uint256(_collectionId)];

        // Add the asset ID to the collection's assetId array
        collection.assetId.push(_assetId);

        // Update the collection's assetId field
        collections[uint256(_collectionId)].assetId = collection.assetId;

        bytes32 assetId = keccak256(abi.encodePacked(_assetId));
        emit AssetAdded(_collectionId, assetId);
        // Emit an AssetAdded event
        emit AssetAdded(_collectionId, assetId);
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
    ) public returns (string memory) {
        require(bytes(_id).length > 0, "ID cannot be empty");

        bytes32 assetId = keccak256(abi.encodePacked(_id));

        // Check if asset with this ID already exists
        require(
            assets_display[assetId].owner == address(0),
            "Asset with this ID already exists"
        );

        Assets storage asset = assets_display[assetId];
        asset._id = _id;
        asset.owner = msg.sender;
        asset.title = _title;
        asset.description = _description;
        asset.image = _image;
        asset.category = _category;
        asset.date = _date;

        assetIds.push(assetId);
        no_of_assets++;

        return _id;
    }

    function assetExists(bytes32 assetId) public view returns (bool) {
        return assets_display[assetId].owner != address(0);
    }

    // function createAsset(
    //     string memory _id,
    //     string memory _title,
    //     string memory _description,
    //     string memory _image,
    //     string memory _category,
    //     string memory _date
    // ) public returns (uint256) {
    //     bytes32 assetId = keccak256(abi.encodePacked(uint256(no_of_assets)));
    //     Assets storage assets = assets_display[assetId];

    //     assets._id = _id;
    //     assets.owner = msg.sender;
    //     assets.title = _title;
    //     assets.description = _description;
    //     assets.image = _image;
    //     assets.category = _category;
    //     assets.date = _date;

    //     no_of_assets++;

    //     return no_of_assets - 1;
    // }

    // function getAllAssets() public view returns (Assets[] memory) {
    //     Assets[] memory allAssets = new Assets[](no_of_assets);

    //     for (uint256 i = 0; i < no_of_assets; i++) {
    //         Assets storage asset = assets_display[i];

    //         allAssets[i] = asset;
    //     }

    //     return allAssets;
    // }
    // function getAllAssets() public view returns (Assets[] memory) {
    //     Assets[] memory allAssets = new Assets[](no_of_assets);

    //     for (uint256 i = 0; i < no_of_assets; i++) {
    //         bytes32 assetId = keccak256(abi.encodePacked(i));
    //         Assets storage asset = assets_display[assetId];

    //         allAssets[i] = Assets({
    //             _id: asset._id,
    //             owner: asset.owner,
    //             title: asset.title,
    //             description: asset.description,
    //             image: asset.image,
    //             category: asset.category,
    //             date: asset.date,
    //             appreciators: new Appreciator[](asset.appreciators.length)
    //         });

    //         for (uint256 j = 0; j < asset.appreciators.length; j++) {
    //             allAssets[i].appreciators[j] = Appreciator({
    //                 appreciator: asset.appreciators[j].appreciator,
    //                 assetId: asset.appreciators[j].assetId,
    //                 amountAppreciated: asset.appreciators[j].amountAppreciated,
    //                 appreciationQuantity: asset
    //                     .appreciators[j]
    //                     .appreciationQuantity
    //             });
    //         }
    //     }

    //     return allAssets;
    // }

    function getAllAssets() public view returns (Assets[] memory) {
        Assets[] memory assets = new Assets[](no_of_assets);

        for (uint256 i = 0; i < no_of_assets; i++) {
            assets[i] = assets_display[assetIds[i]];
        }

        return assets;
    }

    // function getAsset(bytes32 _id) public view returns (Assets memory) {
    //     uint256 id = uint256(_id);
    //     require(id < no_of_assets, "Asset with the given ID does not exist.");
    //     return assets_display[id];
    // }

    function getAssetById(
        string memory _id
    ) public view returns (Assets memory) {
        bytes32 key = keccak256(bytes(_id));
        Assets storage asset = assets_display[key];

        if (keccak256(bytes(asset._id)) == keccak256(bytes(_id))) {
            // Get the number of appreciators
            uint256 numAppreciators = asset.appreciators.length;

            // Initialize a new array to store the addresses of the appreciators
            address[] memory appreciatorAddresses = new address[](
                numAppreciators
            );

            // Loop through the appreciators and add their addresses to the array
            for (uint256 i = 0; i < numAppreciators; i++) {
                appreciatorAddresses[i] = asset.appreciators[i].appreciator;
            }

            // Return the asset without the appreciatorAddresses field
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
        } else {
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
    }

    function appreciateAssetById(
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

            // Increment no_of_appreciators
            no_of_appreciators++;
        } else {
            asset.appreciators[index - 1].amountAppreciated += msg.value;
            asset.appreciators[index - 1].appreciationQuantity++;
        }

        (bool sent, ) = _receiver.call{value: msg.value}("");
        require(sent, "Ether transfer to asset owner failed.");
    }

    function getAppreciatorsByAssetId(
        string memory _id
    ) public view returns (Appreciator[] memory) {
        bytes32 assetId = keccak256(abi.encodePacked(_id));
        Assets storage asset = assets_display[assetId];

        return asset.appreciators;
    }

    function getAllAppreciators() public view returns (Appreciator[] memory) {
        Appreciator[] memory allAppreciators = new Appreciator[](
            no_of_appreciators
        );
        uint256 currentIndex = 0;

        // Loop through all the assets
        for (uint256 i = 0; i < assetIds.length; i++) {
            bytes32 assetId = assetIds[i];
            Assets storage asset = assets_display[assetId];

            // Loop through all the appreciators for this asset
            for (uint256 j = 0; j < asset.appreciators.length; j++) {
                allAppreciators[currentIndex] = asset.appreciators[j];
                currentIndex++;
            }
        }

        return allAppreciators;
    }
}
