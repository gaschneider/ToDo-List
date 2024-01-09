using System.Net;

namespace ToDoTime.Domain.Exceptions
{
    public class NotFoundException : Exception
    {
        private readonly HttpStatusCode _statusCode = HttpStatusCode.NotFound;
        public NotFoundException() { }
        public NotFoundException(string message) : base(message)
        { }
        public NotFoundException(string message, Exception innerException) : base(message, innerException)
        { }

        public HttpStatusCode StatusCode
        {
            get { return this._statusCode; }
        }
    }
}
