import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to help with debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen items-center flex justify-center">
          <div className="text-center">
            <div className="mt-7 xl:mt-10 space-y-3">
              <h1 className="font-bold text-30 xl:text-48 text-primary ">Something went wrong.</h1>
              <p className="font-normal text-12 md:text-14 xl:text-16 text-[#64748B] ">Please try{" "}<span className="text-primary">refreshing the page</span> or{" "}<span className="text-primary"> contact support.</span>
              </p>
              <p className="font-normal text-12 md:text-14 xl:text-16 text-[#64748B] ">Please Check Your code and check Errors in Console.</p>
              <div className="flex items-center justify-center">
                <button type="button" onClick={this.refreshPage} className="btn_primary mt-10 w-auto border border-primary hover:border-primary">Refresh Page</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
