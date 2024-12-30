import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { FaPlus, FaPen, FaTrash, FaSync } from 'react-icons/fa';

const LeftReport = ({ reports = [], onAdd, onEdit, onDelete, onRefresh }) => {
  return (
    <Row className="h-100 g-0">
      <Col xs="12" className="p-3 d-flex flex-column h-100">
        <Row>
          <Col>
            <h4 className="m-0 text-dark">Reports ({reports.length})</h4>
          </Col>
        </Row>
        
        <Row className="flex-grow-1 mt-4">
          <Col>
            {reports.length === 0 ? (
              <div className="text-muted">
                There are no generated reports to display.
              </div>
            ) : (
              <div>
                {/* Report list items would go here */}
              </div>
            )}
          </Col>
        </Row>

        <Row className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <style>
              {`
                .hover-button:hover svg {
                  color: white !important;
                }
                .hover-button-outline:hover svg {
                  color: white !important;
                }
              `}
            </style>
            <Col className="d-flex gap-2">
              <Button
                color="primary"
                outline
                className="rounded-1 px-3 align-middle hover-button-outline"
                onClick={onRefresh}
              >
                <FaSync className="text-primary align-middle mb-1" />
              </Button>
              <Button
                color="primary"
                outline
                className="rounded-1 px-3 align-middle hover-button-outline"
                onClick={onAdd}
              >
                <FaPlus className="text-primary me-1 align-middle mb-1" />
                Add
              </Button>
              <Button
                color="primary"
                outline
                className="rounded-1 px-3 align-middle hover-button-outline"
                onClick={onEdit}
              >
                <FaPen className="text-dark me-1 align-middle mb-1" />
                Edit
              </Button>
              <Button
                color="danger"
                outline
                className="rounded-1 px-3 align-middle hover-button-outline"
                onClick={onDelete}
              >
                <FaTrash className="text-danger me-1 align-middle mb-1" />
                Delete
              </Button>
            </Col>
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default LeftReport;