//LIBRARIES
import { useState, useEffect } from "react";

import Button from "./Button";
import TextField from "./TextField";
import ContributorModal from "../../app/routes/app/NewSpecimen/ContributorModal";
import Modal from "./modal/Modal";
import AddContributor from "../../features/contributors/AddContributor";
import HoverableActions from "./HoverableActions";

export default function SelectList({
  items = [
    {
      id: 1,
      name: "María de los Ángeles Arenas Valdes",
    },
    { id: 2, name: "qwer" },
    { id: 3, name: "zxcv" },
    { id: 4, name: "zxcv" },
    { id: 5, name: "zxcv" },
    { id: 6, name: "zxcv" },
  ],
}) {
  const [_items, setItems] = useState(items);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [filterText, setFilterText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newContributor, setNewContributor] = useState("");
  const [itemToEdit, setItemToEdit] = useState({ id: 0, id: "" });

  useEffect(() => {
    if (itemToEdit !== null) {
    }
  }, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const handleAdd = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const handleSelection = (event) => {
    const newSelectedItem = parseInt(event.target.value);
    console.log(newSelectedItem);

    console.log(selectedItems);
    if (!selectedItems.has(newSelectedItem)) {
      setSelectedItems((prev) => new Set(prev).add(newSelectedItem));
    } else {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(newSelectedItem);
        return newSet;
      });
    }
  };

  const filteredItems = _items.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleEditSelection = (_itemToEdit) => {
    setItemToEdit((prev) => _itemToEdit);
    toggleEditModal();
  };

  return (
    <>
      {/*
      <ContributorModal
        open={showModal}
        onSecondaryClick={toggleModal}
        onSubmit={handleAdd}
      ></ContributorModal>
    */}

      <Modal title={"asdf"} open={showAddModal}>
        <AddContributor
          onSecondaryClick={toggleAddModal}
          onSubmit={handleAdd}
        ></AddContributor>
      </Modal>

      <Modal title={"Editar"} open={showEditModal}>
        <AddContributor
          onSecondaryClick={toggleEditModal}
          onSubmit={handleAdd}
          contributor={itemToEdit}
        ></AddContributor>
      </Modal>

      <div>
        <div className="flex-row gap-1rem">
          <input
            type="text"
            placeholder="Buscar colaboradores"
            onChange={handleFilterChange}
          />
          <Button className="primary" iconType="add" onClick={toggleAddModal}>
            Registrar colaborador
          </Button>
        </div>

        <ul className="select-list">
          {filteredItems.map((item, index) => (
            <>
              <li
                key={index}
                value={item.id}
                onClick={handleSelection}
                className="selectable hoverable p-1rem flex-row divider"
              >
                <input
                  type="checkbox"
                  id={index}
                  name={item.name}
                  value={item.id}
                  onChange={handleSelection}
                  checked={selectedItems.has(item.id)}
                />
                {item.name}
                <HoverableActions
                  secondaryAction={() => handleEditSelection(item)}
                />
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
