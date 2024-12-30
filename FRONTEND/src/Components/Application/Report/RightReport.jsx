import React from "react";
import { Row, Col, Button } from "reactstrap";
import { FaPlus } from "react-icons/fa";

const RightReport = ({ onAdd }) => {
  return (
    <Row className="h-100 g-0 align-items-center justify-content-center">
      <Col xs="12" className="d-flex justify-content-center">
        <div>
          <style>
            {`
              .hover-button:hover svg {
                color: white !important;
              }
            `}
          </style>
          <Button 
            color="primary" 
            outline 
            className="rounded-1 px-4 py-2 hover-button" 
            onClick={onAdd}
          >
            <FaPlus className="text-primary me-2 align-middle mb-1" />
            Add a new report
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default RightReport;